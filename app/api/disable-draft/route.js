import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(req) {
  ;(await draftMode()).disable()
  const from = new URL(req.url).searchParams.get('slug') || '/'
  return NextResponse.redirect(new URL(from, req.url))
}
