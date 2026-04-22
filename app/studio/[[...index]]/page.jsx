import { metadata as studioMetadata, viewport as studioViewport } from 'next-sanity/studio'

import Studio from './Studio'

export const dynamic = 'force-static'

export const metadata = {
  ...studioMetadata,
  robots: 'noindex, nofollow',
}

export const viewport = studioViewport

export default function StudioPage() {
  return <Studio />
}
