import 'tailwindcss/tailwind.css'
import '@/styles/index.css'

import {
  IBM_Plex_Mono,
  Open_Sans,
  Palanquin_Dark,
  PT_Serif,
} from 'next/font/google'

const serif = PT_Serif({
  variable: '--font-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
})
const sans = Palanquin_Dark({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
})
const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
})
const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
})

export default async function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${mono.variable} ${sans.variable} ${openSans.variable} ${serif.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
