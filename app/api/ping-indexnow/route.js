import { NextResponse } from 'next/server'

import { pingIndexNow } from '@/lib/indexnow'
import { revalidateSecret } from '@/sanity/env'

/**
 * Ping IndexNow to notify Bing, Yandex, Naver, Seznam, and other
 * participating engines that content has changed. One request fans
 * out across the entire network.
 *
 * Auth — accepts either:
 *   ?secret=<SANITY_REVALIDATE_SECRET>   (manual calls, Sanity hooks)
 *   Authorization: Bearer <CRON_SECRET>  (Vercel Cron)
 *
 * Google does not participate in IndexNow; use Search Console for that.
 */
export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')
  const authHeader = req.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  const isSecretValid = revalidateSecret && secret === revalidateSecret
  const isCronValid =
    cronSecret && authHeader === `Bearer ${cronSecret}`

  if (!isSecretValid && !isCronValid) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const singleUrl = searchParams.get('url')
  const urlList = singleUrl
    ? [singleUrl]
    : ['https://logangelzer.com/', 'https://logangelzer.com/sitemap.xml']

  const result = await pingIndexNow(urlList)
  return NextResponse.json(result)
}
