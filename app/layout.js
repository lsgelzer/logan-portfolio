import 'tailwindcss/tailwind.css'
import '@/styles/index.css'

import { JetBrains_Mono, Open_Sans, Space_Grotesk } from 'next/font/google'

const display = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: true,
  adjustFontFallback: 'Arial',
})
const mono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  preload: true,
})
const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  preload: false,
})

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f2efe3' },
    { media: '(prefers-color-scheme: dark)', color: '#0a1f15' },
  ],
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} ${openSans.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body>{children}</body>
    </html>
  )
}
