import imageUrlBuilder from '@sanity/image-url'

import { dataset, projectId } from '../env'

const builder = imageUrlBuilder({ projectId, dataset })

export function urlFor(source) {
  if (!source?.asset && !source?._ref && !source) return null
  return builder.image(source).auto('format').fit('max')
}
