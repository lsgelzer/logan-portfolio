import { PROFILE } from '@/lib/portfolio-data'

export default function manifest() {
  return {
    name: PROFILE.name,
    short_name: 'Logan Gelzer',
    description:
      'Logan Gelzer — Miami-based Shopify Expert, software developer, and UI/UX designer with 12+ years of ecommerce experience.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f2efe3',
    theme_color: '#0a1f15',
    icons: [{ src: '/favicon.png', sizes: 'any' }],
  }
}
