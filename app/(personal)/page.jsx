import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import Link from 'next/link'

import { HomePage } from '@/components/page-components/home/HomePage'
import { studioUrl } from '@/sanity/lib/api'
import { loadSettings } from '@/sanity/loader/loadQuery'

const HomePagePreview = dynamic(
  () => import('@/components/page-components/home/HomePage'),
)

export default async function IndexRoute() {
  const initial = await loadSettings()

  if (draftMode().isEnabled) {
    return <HomePagePreview initial={initial} />
  }

  if (!initial.data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a homepage yet,{' '}
        <Link href={`${studioUrl}/desk/home`} className="underline">
          create one now
        </Link>
        !
      </div>
    )
  }

  return (
    <>
      <HomePage data={initial.data} />
    </>
  )
}
