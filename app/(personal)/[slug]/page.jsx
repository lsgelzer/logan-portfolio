import { toPlainText } from '@portabletext/react'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { Page } from '../../../components/pages/page/Page'
import { generateStaticSlugs } from '../../../sanity/loader/generateStaticSlugs'
import { loadPage } from '../../../sanity/loader/loadQuery'
const PagePreview = dynamic(
  () => import('../../../components/pages/page/PagePreview'),
)

export async function generateMetadata({ params }, parent) {
  const { data: page } = await loadPage(params.slug)

  return {
    title: page?.title,
    description: page?.overview
      ? toPlainText(page.overview)
      : (await parent).description,
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('page')
}

export default async function PageSlugRoute({ params }) {
  const initial = await loadPage(params.slug)

  if (draftMode().isEnabled) {
    return <PagePreview params={params} initial={initial} />
  }

  if (!initial.data) {
    notFound()
  }

  return <Page data={initial.data} />
}
