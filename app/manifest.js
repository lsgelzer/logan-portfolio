import { loadHomePageData } from '@/sanity/lib/loadData'

export default async function manifest() {
  const { profile, seo } = await loadHomePageData()
  return {
    name: profile.name,
    short_name: 'Logan Gelzer',
    description: seo.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#f2efe3',
    theme_color: '#0a1f15',
    icons: [
      { src: '/icon.png', sizes: '180x180', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
