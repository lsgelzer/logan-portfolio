/**
 * Shape a Sanity project into the flat shape the UI components expect.
 */
export function yearsLabel(duration, present) {
  if (!duration?.start) return ''
  const start = new Date(duration.start).getFullYear()
  if (present) return `${start} – Present`
  if (!duration.end) return String(start)
  const end = new Date(duration.end).getFullYear()
  return start === end ? String(start) : `${start} – ${end}`
}

export function shapeProject(p) {
  return {
    id: p.id || p._id,
    name: p.name,
    url: p.url,
    years: yearsLabel(p.duration, p.present),
    tags: p.tags || [],
    stack: p.stack || [],
    mockup: p.mockup || null,
    logo: p.logo || null,
    body: (p.body || []).filter(Boolean),
  }
}
