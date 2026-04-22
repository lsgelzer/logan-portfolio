import { parseBody } from 'next-sanity/webhook'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

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
    return NextResponse.json({ revalidated: true, type: body._type })
  } catch (err) {
    return new NextResponse(err.message, { status: 500 })
  }
}
