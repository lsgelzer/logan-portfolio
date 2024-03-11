import { groq } from 'next-sanity'

export const projectsQuery = groq`
  *[_type == "project" ] {
    _id,
    coverImage{asset->{...}},
    clientImage{asset->{...}},
    overview,
    present,
    duration,
    site,
    client,
    tags,

  }
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    title,
    overview,
    ogImage,
  }
`
export const clientsQuery = groq`
  *[_type == "client"]{
    client,
    site,
    image{asset->{...}},
  }
`
