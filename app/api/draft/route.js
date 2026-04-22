import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

import { revalidateSecret } from '@/sanity/env'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')
  if (!revalidateSecret || secret !== revalidateSecret) {
    return new Response('Invalid secret', { status: 401 })
  }
  ;(await draftMode()).enable()
  redirect(searchParams.get('slug') || '/')
}
