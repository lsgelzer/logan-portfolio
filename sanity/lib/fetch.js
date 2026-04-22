import 'server-only'

import { client } from './client'

/**
 * Server-side Sanity fetch with Next.js cache tags.
 * Pass a `tags` array to enable tag-based revalidation; otherwise revalidates every hour.
 */
export function sanityFetch(query, params = {}, tags = []) {
  return client.fetch(query, params, {
    next: {
      revalidate: tags.length ? false : 3600,
      tags,
    },
  })
}
