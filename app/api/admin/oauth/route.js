import { NextResponse } from 'next/server'

/**
 * OAuth Setup Helper
 *
 * This route helps obtain Google OAuth refresh tokens for calendar access.
 * Protected by ADMIN_SECRET environment variable.
 *
 * Usage:
 * 1. Set up Google Cloud project and OAuth credentials
 * 2. Set ADMIN_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET env vars
 * 3. Visit /api/admin/oauth?secret=YOUR_ADMIN_SECRET&account=hello (or personal)
 * 4. Authorize the Google account
 * 5. Copy the refresh token to your Vercel env vars
 */

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'

const SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events',
].join(' ')

function getBaseUrl(request) {
  const host = request.headers.get('host')
  const proto = request.headers.get('x-forwarded-proto') || 'https'
  return `${proto}://${host}`
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const account = searchParams.get('account')
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  const adminSecret = process.env.ADMIN_SECRET
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET

  if (!adminSecret) {
    return NextResponse.json(
      { error: 'ADMIN_SECRET not configured' },
      { status: 500 }
    )
  }

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'Google OAuth credentials not configured' },
      { status: 500 }
    )
  }

  if (code && state) {
    let parsedState
    try {
      parsedState = JSON.parse(Buffer.from(state, 'base64').toString())
    } catch {
      return NextResponse.json({ error: 'Invalid state' }, { status: 400 })
    }

    if (parsedState.secret !== adminSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const baseUrl = getBaseUrl(request)
    const redirectUri = `${baseUrl}/api/admin/oauth`

    try {
      const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        }),
      })

      const tokens = await tokenResponse.json()

      if (tokens.error) {
        return NextResponse.json(
          { error: tokens.error_description || tokens.error },
          { status: 400 }
        )
      }

      const envVar =
        parsedState.account === 'hello'
          ? 'GOOGLE_REFRESH_TOKEN_HELLO'
          : 'GOOGLE_REFRESH_TOKEN_PERSONAL'

      return new NextResponse(
        `<!DOCTYPE html>
<html>
<head>
  <title>OAuth Success</title>
  <style>
    body { font-family: system-ui; max-width: 600px; margin: 40px auto; padding: 20px; }
    pre { background: #f5f5f5; padding: 16px; border-radius: 8px; overflow-x: auto; word-break: break-all; white-space: pre-wrap; }
    .success { color: #059669; }
    code { font-size: 14px; }
  </style>
</head>
<body>
  <h1 class="success">✓ OAuth Authorization Successful</h1>
  <p>Account: <strong>${parsedState.account}</strong></p>
  <h2>Refresh Token</h2>
  <p>Add this to your Vercel environment variables as:</p>
  <pre><code>${envVar}=${tokens.refresh_token}</code></pre>
  <p><strong>Important:</strong> Keep this token secret. Do not commit it to version control.</p>
  <h2>Next Steps</h2>
  <ol>
    <li>Go to your Vercel project dashboard</li>
    <li>Navigate to Settings → Environment Variables</li>
    <li>Add the environment variable shown above</li>
    <li>Redeploy your project</li>
  </ol>
</body>
</html>`,
        {
          headers: { 'Content-Type': 'text/html' },
        }
      )
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to exchange code for tokens' },
        { status: 500 }
      )
    }
  }

  if (secret !== adminSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!account || !['hello', 'personal'].includes(account)) {
    return new NextResponse(
      `<!DOCTYPE html>
<html>
<head>
  <title>OAuth Setup</title>
  <style>
    body { font-family: system-ui; max-width: 600px; margin: 40px auto; padding: 20px; }
    a { color: #059669; }
    .btn { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 8px 8px 8px 0; }
  </style>
</head>
<body>
  <h1>Google Calendar OAuth Setup</h1>
  <p>Select which account to authorize:</p>
  <a class="btn" href="/api/admin/oauth?secret=${encodeURIComponent(secret)}&account=hello">
    hello@logangelzer.com (Primary)
  </a>
  <a class="btn" href="/api/admin/oauth?secret=${encodeURIComponent(secret)}&account=personal">
    lsgelzer7@gmail.com (Secondary)
  </a>
</body>
</html>`,
      {
        headers: { 'Content-Type': 'text/html' },
      }
    )
  }

  const baseUrl = getBaseUrl(request)
  const redirectUri = `${baseUrl}/api/admin/oauth`

  const authState = Buffer.from(
    JSON.stringify({ secret, account })
  ).toString('base64')

  const authUrl = new URL(GOOGLE_AUTH_URL)
  authUrl.searchParams.set('client_id', clientId)
  authUrl.searchParams.set('redirect_uri', redirectUri)
  authUrl.searchParams.set('response_type', 'code')
  authUrl.searchParams.set('scope', SCOPES)
  authUrl.searchParams.set('access_type', 'offline')
  authUrl.searchParams.set('prompt', 'consent')
  authUrl.searchParams.set('state', authState)

  if (account === 'hello') {
    authUrl.searchParams.set('login_hint', 'hello@logangelzer.com')
  } else {
    authUrl.searchParams.set('login_hint', 'lsgelzer7@gmail.com')
  }

  return NextResponse.redirect(authUrl.toString())
}
