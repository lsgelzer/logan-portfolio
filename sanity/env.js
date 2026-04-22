export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing NEXT_PUBLIC_SANITY_DATASET',
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing NEXT_PUBLIC_SANITY_PROJECT_ID',
)

export const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || '/studio'

export const token = process.env.SANITY_API_READ_TOKEN

export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET

function assertValue(v, message) {
  if (v === undefined || v === '') {
    throw new Error(message)
  }
  return v
}
