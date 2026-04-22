import { NextResponse } from 'next/server'

import { revalidateSecret } from '@/sanity/env'

const INDEXNOW_KEY = 'c2ac0972b70a8fc490650bea7763d3ab'

/**
 * Ping IndexNow to notify Bing, Yandex, Naver, Seznam, and other
 * participating engines that content has changed. One request fans out
 * across the IndexNow network.
 *
 * Usage:
 *   GET /api/ping-indexnow?secret=<SANITY_REVALIDATE_SECRET>
 *   GET /api/ping-indexnow?secret=<secret>&url=https://logangelzer.com/
 *
 * Google does not participate in IndexNow; use Search Console for that.
 */
export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')
  if (!revalidateSecret || secret !== revalidateSecret) {
    return new NextResponse('Invalid secret', { status: 401 })
  }

  const host = 'logangelzer.com'
  const singleUrl = searchParams.get('url')
  const urlList = singleUrl
    ? [singleUrl]
    : [`https://${host}/`, `https://${host}/sitemap.xml`]

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    })
    return NextResponse.json({
      submitted: urlList,
      status: res.status,
      ok: res.ok,
    })
  } catch (err) {
    return new NextResponse(err.message, { status: 500 })
  }
}
