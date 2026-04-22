import 'server-only'

import { cache } from 'react'

import { PROFILE as FALLBACK_PROFILE,
  SOCIALS as FALLBACK_SOCIALS,
  ABOUT as FALLBACK_ABOUT,
  STATS as FALLBACK_STATS,
  HERO_STATS as FALLBACK_HERO_STATS,
  STATS_STRIP as FALLBACK_STATS_STRIP,
  SKILLS as FALLBACK_SKILLS,
  ASIDE_CHIPS as FALLBACK_ASIDE_CHIPS,
  CLIENTS as FALLBACK_CLIENTS,
  PROJECTS as FALLBACK_PROJECTS,
} from '@/lib/portfolio-data'

import {
  clientsQuery,
  projectsQuery,
  settingsQuery,
} from './queries'
import { sanityFetch } from './fetch'
import { shapeProject } from './transform'

/**
 * Load the full home-page payload. Each piece falls back to static data
 * in lib/portfolio-data.js when the Sanity field is unset.
 *
 * Run in parallel; dedupe via React cache at the call site.
 */
export const loadHomePageData = cache(async function loadHomePageData() {
  const [settings, clients, projects] = await Promise.all([
    sanityFetch(settingsQuery, {}, ['settings']).catch(() => null),
    sanityFetch(clientsQuery, {}, ['client']).catch(() => []),
    sanityFetch(projectsQuery, {}, ['project']).catch(() => []),
  ])

  const profile = {
    ...FALLBACK_PROFILE,
    ...(settings?.profile || {}),
    roles: settings?.profile?.roles?.length
      ? settings.profile.roles
      : FALLBACK_PROFILE.roles,
  }
  const socials = settings?.socials?.length
    ? settings.socials
    : FALLBACK_SOCIALS
  const about = settings?.about?.length ? settings.about : FALLBACK_ABOUT
  const stats = settings?.stats?.length ? settings.stats : FALLBACK_STATS
  const heroStats = settings?.heroStats?.length
    ? settings.heroStats
    : FALLBACK_HERO_STATS
  const statsStrip = settings?.statsStrip?.length
    ? settings.statsStrip
    : FALLBACK_STATS_STRIP
  const skills = settings?.skills?.length ? settings.skills : FALLBACK_SKILLS
  const asideChips = settings?.asideChips?.length
    ? settings.asideChips
    : FALLBACK_ASIDE_CHIPS

  const shapedClients = (clients?.length ? clients : FALLBACK_CLIENTS).map(
    (c) => ({
      name: c.name || c.client || '',
      logo: c.logo || c.image || '',
      invert: !!c.invert,
      alt: c.logoAlt || c.alt || c.name || '',
    }),
  )

  const shapedProjects = projects?.length
    ? projects.map(shapeProject).filter((p) => p.name)
    : FALLBACK_PROJECTS

  const defaultTitle =
    'Logan Gelzer — Freelance Shopify Plus & Hydrogen Developer in Miami'
  const defaultDescription =
    "Freelance Shopify Plus and headless Hydrogen developer in Miami. 12+ years scaling DTC brands with custom themes, Checkout Extensibility, Shopify Functions, CRO, and A/B testing. Worked with Chubbies, Nolah, Alo Yoga, Overtime, Wild Wonder, BaronFig, and Kudos. Available for freelance."

  // Legacy Sanity boilerplate predates the SEO rewrite; prefer code defaults
  // unless Sanity has been explicitly updated with tighter copy.
  const isLegacyTitle = (t) =>
    !t ||
    /Ecommerce Expert \| Software Developer \| UI\/UX Designer/i.test(t)
  const isLegacyDescription = (d) =>
    !d ||
    d.length > 240 ||
    /Discover unparalleled digital transformation/i.test(d)

  const seoTitle = isLegacyTitle(settings?.title) ? defaultTitle : settings.title
  const seoDescription = isLegacyDescription(settings?.overview)
    ? defaultDescription
    : settings.overview

  return {
    seo: {
      title: seoTitle,
      description: seoDescription,
      ogImage: settings?.ogImage || '/og-image.png',
      url: profile.url,
    },
    profile,
    socials,
    about,
    stats,
    heroStats,
    statsStrip,
    skills,
    asideChips,
    clients: shapedClients,
    projects: shapedProjects,
  }
})
