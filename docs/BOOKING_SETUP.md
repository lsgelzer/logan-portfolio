# Booking System Setup Guide

This guide walks you through setting up the custom booking system for logangelzer.com.

## Prerequisites

- Access to the Google Cloud Console
- Access to both Google accounts:
  - `hello@logangelzer.com` (primary calendar, creates events)
  - `lsgelzer7@gmail.com` (secondary calendar, checked for conflicts)
- Access to Vercel dashboard for environment variables

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note the project name for reference

## Step 2: Enable Google Calendar API

1. In the Cloud Console, go to **APIs & Services** → **Library**
2. Search for "Google Calendar API"
3. Click on it and press **Enable**

## Step 3: Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Select **External** user type (unless you have Google Workspace)
3. Fill in the required fields:
   - **App name**: Logan Gelzer Booking
   - **User support email**: hello@logangelzer.com
   - **Developer contact**: hello@logangelzer.com
4. Click **Save and Continue**
5. On the Scopes page, click **Add or Remove Scopes**
6. Add these scopes:
   - `https://www.googleapis.com/auth/calendar.readonly`
   - `https://www.googleapis.com/auth/calendar.events`
7. Click **Save and Continue**
8. On Test Users, add both email addresses:
   - `hello@logangelzer.com`
   - `lsgelzer7@gmail.com`
9. Click **Save and Continue**

> **Note**: While in testing mode, only the listed test users can authorize.
> For production, you'll need to verify the app or publish it.

## Step 4: Create OAuth Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Select **Web application**
4. Name it: "Logan Portfolio Booking"
5. Under **Authorized redirect URIs**, add:
   - `https://logangelzer.com/api/admin/oauth`
   - `https://YOUR-PREVIEW-URL.vercel.app/api/admin/oauth` (for testing)
   - `http://localhost:3000/api/admin/oauth` (for local dev)
6. Click **Create**
7. **Copy the Client ID and Client Secret** - you'll need these

## Step 5: Set Environment Variables in Vercel

Go to your Vercel project → **Settings** → **Environment Variables**

Add these variables (for Production, Preview, and Development):

| Variable | Description |
|----------|-------------|
| `GOOGLE_CLIENT_ID` | OAuth Client ID from Step 4 |
| `GOOGLE_CLIENT_SECRET` | OAuth Client Secret from Step 4 |
| `ADMIN_SECRET` | A random secret string for admin routes (generate one: `openssl rand -hex 32`) |

## Step 6: Obtain Refresh Tokens

After deploying with the above env vars:

1. Visit: `https://logangelzer.com/api/admin/oauth?secret=YOUR_ADMIN_SECRET`
2. Click "hello@logangelzer.com (Primary)"
3. Sign in with the hello@ account and authorize
4. Copy the refresh token shown
5. Go back and authorize the personal account too

Add the refresh tokens to Vercel:

| Variable | Description |
|----------|-------------|
| `GOOGLE_REFRESH_TOKEN_HELLO` | Refresh token for hello@logangelzer.com |
| `GOOGLE_REFRESH_TOKEN_PERSONAL` | Refresh token for lsgelzer7@gmail.com |

## Step 7: Verify Setup

1. Redeploy your Vercel project
2. Visit `/book` to test the booking flow
3. The calendar should show available slots

## Environment Variables Summary

```
# Google OAuth (required)
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret

# Refresh tokens (required for calendar access)
GOOGLE_REFRESH_TOKEN_HELLO=refresh-token-for-hello
GOOGLE_REFRESH_TOKEN_PERSONAL=refresh-token-for-personal

# Admin secret (required for OAuth setup route)
ADMIN_SECRET=your-random-secret-string

# Optional
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Configuration

Edit `lib/booking-config.js` to customize:

- **Working hours**: Default Mon-Fri 9am-5pm ET
- **Slot duration**: Default 30 minutes
- **Buffer time**: Default 15 minutes between meetings
- **Minimum notice**: Default 24 hours
- **Booking window**: Default 30 days ahead

## Troubleshooting

### "Calendar integration not configured"
- Check that all 4 Google env vars are set
- Verify the refresh tokens are valid (re-authorize if needed)

### "No available times"
- Check that working hours are configured correctly
- Verify the timezone setting matches your calendar

### OAuth errors
- Ensure redirect URIs match exactly in Google Cloud Console
- Check that both accounts are added as test users
- Verify the consent screen scopes are correct

### Rate limiting
- The system limits to 10 requests/hour per IP
- Max 3 bookings per day (configurable in booking-config.js)

## Security Notes

- **Never commit secrets** to version control
- The OAuth setup route is protected by ADMIN_SECRET
- Honeypot field protects against spam
- Server-side availability check prevents double-booking
- No customer PII is logged
