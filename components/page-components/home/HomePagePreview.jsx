'use client'

import { settingsQuery } from '@/sanity/lib/queries'

import HomePage from './HomePage'

export default function HomePagePreview(props) {
  const { initial } = props
  const { data, encodeDataAttribute } = useQuery(settingsQuery, {}, { initial })

  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Home document to see the preview!
      </div>
    )
  }

  return <HomePage data={data} encodeDataAttribute={encodeDataAttribute} />
}
