import { toPlainText } from '@portabletext/react'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { Suspense } from 'react'

import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { loadSettings } from '@/sanity/loader/loadQuery'

const VisualEditing = dynamic(() => import('@/sanity/loader/VisualEditing'))

export async function generateMetadata() {
  const [{ data: settings }] = await Promise.all([loadSettings()])
  console.log(settings)
  const ogImage = urlForOpenGraphImage(settings.ogImage)
  return {
    title: settings.title
      ? {
          template: `%s | ${settings.title}`,
          default:
            settings.title ||
            'Logan Gelzer - Ecommerce Expert | Software Developer | UI/UX Designer',
        }
      : undefined,
    description: settings.overview ? toPlainText(settings.overview) : undefined,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export const viewport = {
  themeColor: '#000',
}

export default async function IndexRoute({ children }) {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-white text-black">
        <Suspense>{children}</Suspense>
      </div>
      {draftMode().isEnabled && <VisualEditing />}
    </>
  )
}
