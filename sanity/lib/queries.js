import { groq } from 'next-sanity'

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    title,
    "overview": pt::text(overview),
    "ogImage": ogImage.asset->url,
    profile{name, location, email, url, tagline, roles},
    socials[]{label, url, handle},
    "about": about[style == "normal"]{
      "text": pt::text(@)
    }.text,
    stats[]{k, v},
    heroStats[]{value, suffix, label},
    statsStrip[]{value, suffix, label},
    skills[]{name, years, pct, group, icon},
    asideChips[]{label, icon}
  }
`

export const clientsQuery = groq`
  *[_type == "client"] | order(order asc, client asc){
    "id": _id,
    "name": client,
    site,
    invert,
    "logo": image.asset->url,
    "logoAlt": coalesce(image.alt, client)
  }
`

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt desc){
    "id": _id,
    "name": client,
    "url": site,
    present,
    duration,
    tags,
    stack,
    "mockup": coverImage.asset->url,
    "logo": clientImage.asset->url,
    "body": overview[style == "normal"]{
      "text": pt::text(@)
    }.text
  }
`
