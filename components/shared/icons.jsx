const svgProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true,
  focusable: false,
}

export const Icon = ({ name, className = '', ...rest }) => {
  const C = ICONS[name]
  if (!C) return null
  return <C className={className} {...rest} />
}

const Shopify = (p) => (
  <svg viewBox="0 0 24 24" {...svgProps} {...p}>
    <path
      d="M15.3 4.4c-.3 0-.6.1-.9.3-.3-.7-.8-1.2-1.6-1.2-1 0-1.8.9-2.4 2.1l-2 .6c-.6.2-.6.2-.7.7L6 17.8l8 1.6 5.5-1.2s-2-14.3-2-14.5c-.1-.2-.2-.2-.3-.2-.2 0-2.5.1-2.5.1zm-.2.6c-.4.1-.7.2-1.1.3-.2-1-.7-1.5-1.5-1.6.3.3.5.8.6 1.7l-1.2.4c-.1-.7-.4-1.3-.8-1.7.5.1.9.4 1.2.8-.4 0-.8.2-1.1.5-.3.4-.6.9-.7 1.5-.6.2-1.1.4-1.7.5.2-1 1-2.7 1.9-2.7l-.1-.2 1.2-.4c.4.4.7.9.9 1.6l1.1-.3c-.2-.8-.6-1.3-1.1-1.5.6 0 1.2.5 1.5 1.4.5-.1.9-.2 1.2-.3 0 0-.3-.1-.3-.1z"
      fill="#95BF47"
    />
    <path
      d="M18.3 4.6c-.1 0-1.2-.1-1.2-.1s-.7-.8-.8-.8c0 0-.1-.1-.1 0l-.5 16 4.3-.9S18.4 4.7 18.3 4.6z"
      fill="#5E8E3E"
    />
    <path
      d="M13 10.5l-.4 1.7s-.5-.2-1.2-.2c-.9.1-.9.7-.9.8.1.7 1.9.8 2 2.3.1 1.2-.6 2-1.7 2.1-1.3.1-2-.6-2-.6l.3-1.2s.7.5 1.3.5c.4 0 .5-.3.5-.6-.1-.9-1.6-.9-1.7-2.2-.1-1.2.7-2.4 2.5-2.5.7-.1 1.3.3 1.3.3z"
      fill="#fff"
    />
  </svg>
)

const NextJs = (p) => (
  <svg viewBox="0 0 24 24" {...svgProps} {...p}>
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <path
      d="M9 7v10M15 7v10M9.2 7l5.8 9"
      stroke="#fff"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
)

const React_ = (p) => (
  <svg viewBox="0 0 24 24" {...svgProps} {...p}>
    <g fill="none" stroke="#61DAFB" strokeWidth="1">
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        transform="rotate(120 12 12)"
      />
    </g>
  </svg>
)

const Figma = (p) => (
  <svg viewBox="0 0 24 24" {...svgProps} {...p}>
    <g fillRule="evenodd" transform="translate(4)">
      <circle cx="12" cy="12" fill="#19BCFE" r="4" />
      <path
        d="M4 24c2.2 0 4-1.8 4-4v-4H4a4 4 0 000 8z"
        fill="#09CF83"
      />
      <path d="M4 16h4V8H4a4 4 0 000 8z" fill="#A259FF" />
      <path d="M4 8h4V0H4a4 4 0 000 8z" fill="#F24E1E" />
      <path d="M12 8H8V0h4a4 4 0 010 8z" fill="#FF7262" />
    </g>
  </svg>
)

const NodeJs = (p) => (
  <svg viewBox="0 0 24 24" {...svgProps} {...p}>
    <path
      d="M12 1.9L2.6 7.3v9.4L12 22.1l9.4-5.4V7.3L12 1.9z"
      fill="#539E43"
    />
    <path
      d="M8.8 14.8c.7.4 1.5.6 2.4.6 1.6 0 2.4-.7 2.4-1.7 0-.7-.3-1.1-1.4-1.3l-.4-.1c-.4-.1-.6-.2-.6-.4 0-.2.2-.3.6-.3.3 0 .7.1 1 .3l.6-.9c-.5-.3-1.1-.4-1.6-.4-1.3 0-2.1.6-2.1 1.6 0 .8.5 1.2 1.5 1.4l.4.1c.4.1.5.2.5.3 0 .2-.2.3-.6.3-.5 0-1-.1-1.4-.4l-.3.9z"
      fill="#fff"
    />
  </svg>
)

const Postgres = (p) => (
  <svg viewBox="0 0 24 24" {...svgProps} {...p}>
    <ellipse cx="12" cy="6" rx="9" ry="3" fill="#336791" />
    <path
      d="M3 6v12c0 1.7 4 3 9 3s9-1.3 9-3V6c0 1.7-4 3-9 3S3 7.7 3 6z"
      fill="#336791"
    />
    <path
      d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3"
      fill="none"
      stroke="#fff"
      strokeWidth="0.5"
    />
  </svg>
)

const JavaScript = (p) => (
  <svg viewBox="0 0 24 24" {...svgProps} {...p}>
    <rect width="24" height="24" rx="3" fill="#F7DF1E" />
    <path
      d="M15 17c.5.8 1.1 1.4 2.2 1.4.9 0 1.5-.5 1.5-1.1 0-.8-.6-1-1.6-1.5l-.6-.2c-1.6-.7-2.7-1.5-2.7-3.3 0-1.7 1.3-2.9 3.2-2.9 1.4 0 2.4.5 3.1 1.8l-1.7 1.1c-.4-.7-.8-1-1.4-1-.6 0-1 .4-1 1s.4.9 1.4 1.3l.5.2c1.9.8 3 1.6 3 3.5 0 2-1.6 3.1-3.7 3.1-2 0-3.4-1-4-2.3L15 17zM7 17.2c.4.7.7 1.2 1.4 1.2s1.2-.3 1.2-1.4V9.5h2.2v7.5c0 2.3-1.3 3.3-3.3 3.3-1.8 0-2.8-.9-3.3-2l1.8-1.1z"
      fill="#000"
    />
  </svg>
)

const Remix = (p) => (
  <svg viewBox="0 0 24 24" {...svgProps} {...p}>
    <path
      d="M4 3h9c3 0 5 1.5 5 4 0 2-1.2 3.3-3 3.8 1.5.3 2.6 1.2 2.8 3l.5 3.2H14l-.4-2.5c-.2-1.5-.9-2-2.4-2H8v4.5H4V3zm4 3.2v3h4c1.3 0 2-.5 2-1.5s-.7-1.5-2-1.5H8z"
      fill="#E8F2FF"
      stroke="currentColor"
      strokeWidth="0.4"
    />
  </svg>
)

const Mongo = (p) => (
  <svg viewBox="0 0 24 24" {...svgProps} {...p}>
    <path
      d="M12 2c-2 5-4 8-4 13 0 4 2 7 4 7s4-3 4-7c0-5-2-8-4-13z"
      fill="#47A248"
    />
    <path d="M12 22v-8" stroke="#fff" strokeWidth="0.8" />
  </svg>
)

const TypeScriptIcon = (p) => (
  <svg viewBox="0 0 24 24" {...svgProps} {...p}>
    <rect width="24" height="24" rx="3" fill="#3178C6" />
    <path
      d="M13 11v-1.5h-7V11h2.5v7H10v-7h3zm4 7.2c.5.3 1.1.4 1.7.4.6 0 1.2-.1 1.6-.4.5-.3.9-.6 1.1-1 .3-.5.4-1 .4-1.6 0-.5-.1-.9-.3-1.2-.2-.3-.5-.6-.9-.9s-.9-.5-1.6-.7l-.8-.3c-.3-.1-.5-.3-.6-.5-.1-.2-.2-.4-.2-.6 0-.3.1-.5.3-.6.2-.2.5-.2.9-.2.5 0 1 .1 1.5.4v-1.8c-.5-.2-1-.3-1.6-.3s-1.1.1-1.5.3-.8.5-1 .9c-.2.4-.4.8-.4 1.3 0 .7.2 1.3.6 1.7.4.4 1 .8 1.8 1l.8.3c.4.1.6.3.8.5.1.2.2.4.2.7 0 .3-.1.5-.3.7-.2.2-.5.2-.9.2-.6 0-1.2-.2-1.8-.6v1.9z"
      fill="#fff"
    />
  </svg>
)

const Liquid = (p) => (
  <svg viewBox="0 0 24 24" {...svgProps} {...p}>
    <path
      d="M12 2s-7 8-7 13a7 7 0 0014 0c0-5-7-13-7-13z"
      fill="currentColor"
    />
  </svg>
)

const WordPress = (p) => (
  <svg viewBox="0 0 24 24" {...svgProps} {...p}>
    <g fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M3 10l5 12M13 4l3 16M8 8h6M14 12s-1 4-2 8" />
    </g>
  </svg>
)

const BigCommerce = (p) => (
  <svg viewBox="0 0 24 24" {...svgProps} {...p}>
    <path
      d="M3 4h10a4 4 0 014 4 3.5 3.5 0 01-1.5 3A4 4 0 0118 15c0 2.8-2 5-5 5H3V4zm3 3v4h6a2 2 0 000-4H6zm0 7v3h6a1.5 1.5 0 000-3H6z"
      fill="currentColor"
    />
  </svg>
)

const WooCommerce = (p) => (
  <svg viewBox="0 0 24 24" {...svgProps} {...p}>
    <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="5" width="20" height="12" rx="2" />
      <path d="M6 10l1 4 2-4 2 4 1-4M14 10l1 4 2-4 2 4 1-4" />
    </g>
  </svg>
)

const Tailwind = (p) => (
  <svg viewBox="0 0 24 24" {...svgProps} {...p}>
    <path
      d="M7 10c1-3 3-4 6-4 4 0 5 2 6 4-1-1-2-2-4-2-3 0-3 2-6 2-1 0-2-.3-2-1zM1 16c1-3 3-4 6-4 4 0 5 2 6 4-1-1-2-2-4-2-3 0-3 2-6 2-1 0-2-.3-2-1z"
      fill="currentColor"
    />
  </svg>
)

const Git = (p) => (
  <svg viewBox="0 0 24 24" {...svgProps} {...p}>
    <g fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="12" r="2" />
      <path d="M6 8v8M8 6h5a3 3 0 013 3v1" />
    </g>
  </svg>
)

const AB = (p) => (
  <svg viewBox="0 0 24 24" {...svgProps} {...p}>
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M3 20l5-14 2 6M4 14h5" />
      <path d="M14 6h4a2 2 0 010 4h-4zM14 10h5a2 2 0 010 4h-5zM14 6v8" />
    </g>
  </svg>
)

const Cart = (p) => (
  <svg viewBox="0 0 24 24" {...svgProps} {...p}>
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4h2l2 12h12l2-8H7" />
      <circle cx="9" cy="20" r="1.2" />
      <circle cx="17" cy="20" r="1.2" />
    </g>
  </svg>
)

const Spark = (p) => (
  <svg viewBox="0 0 24 24" {...svgProps} {...p}>
    <path
      d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5z"
      fill="currentColor"
    />
  </svg>
)

const Code = (p) => (
  <svg viewBox="0 0 24 24" {...svgProps} {...p}>
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
    </g>
  </svg>
)

const Bolt = (p) => (
  <svg viewBox="0 0 24 24" {...svgProps} {...p}>
    <path d="M13 2L4 14h6l-1 8 10-13h-7z" fill="currentColor" />
  </svg>
)

const Layers = (p) => (
  <svg viewBox="0 0 24 24" {...svgProps} {...p}>
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 12l9 5 9-5M3 17l9 5 9-5" />
    </g>
  </svg>
)

const Palette = (p) => (
  <svg viewBox="0 0 24 24" {...svgProps} {...p}>
    <g fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2a10 10 0 100 20c1 0 2-.5 2-1.5s-1-1.5-1-2.5 1-2 2-2h3a4 4 0 004-4c0-5.5-4.9-10-10-10z" />
      <circle cx="7" cy="10" r="1.2" fill="currentColor" />
      <circle cx="12" cy="7" r="1.2" fill="currentColor" />
      <circle cx="17" cy="10" r="1.2" fill="currentColor" />
    </g>
  </svg>
)

const Rocket = (p) => (
  <svg viewBox="0 0 24 24" {...svgProps} {...p}>
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2c4 3 6 7 6 11v5l-3-2-3 2-3-2-3 2v-5c0-4 2-8 6-11z" />
      <circle cx="12" cy="10" r="1.5" />
    </g>
  </svg>
)

export const ICONS = {
  shopify: Shopify,
  nextjs: NextJs,
  react: React_,
  figma: Figma,
  node: NodeJs,
  nodejs: NodeJs,
  postgres: Postgres,
  javascript: JavaScript,
  typescript: TypeScriptIcon,
  remix: Remix,
  mongo: Mongo,
  mongodb: Mongo,
  liquid: Liquid,
  wordpress: WordPress,
  bigcommerce: BigCommerce,
  woo: WooCommerce,
  tailwind: Tailwind,
  git: Git,
  ab: AB,
  cart: Cart,
  spark: Spark,
  code: Code,
  bolt: Bolt,
  layers: Layers,
  palette: Palette,
  rocket: Rocket,
}
