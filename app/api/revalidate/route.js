import { parseBody } from 'next-sanity/webhook'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

import { pingIndexNow } from '@/lib/indexnow'
import { revalidateSecret } from '@/sanity/env'

export async function POST(req) {
  try {
    const { isValidSignature, body } = await parseBody(req, revalidateSecret)
    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 })
    }
    if (!body?._type) {
      return new NextResponse('Bad Request — missing _type', { status: 400 })
    }
    revalidateTag(body._type)
    // Notify search engines that content changed. Non-blocking — failures
    // are logged in the response but don't fail the webhook.
    const indexnow = await pingIndexNow([
      'https://logangelzer.com/',
      'https://logangelzer.com/sitemap.xml',
    ])
    return NextResponse.json({
      revalidated: true,
      type: body._type,
      indexnow,
    })
  } catch (err) {
    return new NextResponse(err.message, { status: 500 })
  }
}
