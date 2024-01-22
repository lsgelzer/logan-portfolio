'use client'

import { pagesBySlugQuery } from '../../../sanity/lib/queries'
import { useQuery } from '../../../sanity/loader/useQuery'
import Page from './Page'

export default function PagePreview(props) {
  const { params, initial } = props
  const { data } = useQuery(pagesBySlugQuery, params, {
    initial,
  })

  return <Page data={data} />
}
