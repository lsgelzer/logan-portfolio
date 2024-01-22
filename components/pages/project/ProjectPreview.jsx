'use client'

import { projectBySlugQuery } from '../../../sanity/lib/queries'
import { useQuery } from '../../../sanity/loader/useQuery'
import ProjectPage from './ProjectPage'

export default function ProjectPreview(props) {
  const { params, initial } = props
  const { data, encodeDataAttribute } = useQuery(projectBySlugQuery, params, {
    initial,
  })

  return <ProjectPage data={data} encodeDataAttribute={encodeDataAttribute} />
}
