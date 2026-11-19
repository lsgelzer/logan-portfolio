import { ImageResponse } from 'next/og'

import { filterByIndustry } from '@/components/page-components/work/WorkPage'
import { getIndustry, INDUSTRY_SLUGS } from '@/lib/industries'
import { loadHomePageData } from '@/sanity/lib/loadData'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Logan Gelzer Shopify case studies by industry'

export function generateStaticParams() {
  return INDUSTRY_SLUGS.map((industry) => ({ industry }))
}

// Brand colors (styles/index.css) converted from oklch for Satori.
const BG = '#f8f9f3'
const INK = '#0b2219'
const GREEN = '#1d4d38'
const BLUE = '#a9d7f0'

export default async function Image({ params }) {
  const { industry: slug } = await params
  const industry = getIndustry(slug)
  const { projects } = await loadHomePageData()
  const list = filterByIndustry(projects, slug)
  const names = list
    .slice(0, 6)
    .map((p) => p.name)
    .join(' · ')
  const lead =
    slug === 'agencies'
      ? 'White-label Shopify developer for'
      : 'Shopify developer for'

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: BG,
        padding: '64px 72px',
        borderLeft: `18px solid ${GREEN}`,
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 26,
          color: GREEN,
          letterSpacing: 2,
        }}
      >
        LOGAN GELZER · SENIOR SHOPIFY EXPERT
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', fontSize: 44, color: INK }}>{lead}</div>
        <div
          style={{
            display: 'flex',
            fontSize: 76,
            fontWeight: 700,
            color: INK,
            lineHeight: 1.05,
            marginTop: 8,
          }}
        >
          {industry.audience}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              background: BLUE,
              color: INK,
              fontSize: 30,
              fontWeight: 700,
              padding: '8px 20px',
              borderRadius: 999,
            }}
          >
            {list.length} case studies
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              color: GREEN,
              marginLeft: 20,
            }}
          >
            {`logangelzer.com/work/${slug}`}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            color: INK,
            marginTop: 18,
            opacity: 0.75,
          }}
        >
          {names}
        </div>
      </div>
    </div>,
    size,
  )
}
