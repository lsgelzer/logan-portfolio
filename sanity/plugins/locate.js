import { map } from 'rxjs'
import { DocumentLocationResolver } from 'sanity/presentation'

import { resolveHref } from '../../sanity/lib/utils'

export const locate = (params, context) => {
  if (params.type === 'settings') {
    return {
      message: 'This document is used on all pages',
      tone: 'caution',
    }
  }

  if (
    params.type === 'home' ||
    params.type === 'page' ||
    params.type === 'project'
  ) {
    const doc$ = context.documentStore.listenQuery(
      `*[_id==$id || references($id)]{_type,slug,title}`,
      params,
      { perspective: 'previewDrafts' },
    )
    return doc$.pipe(
      map((docs) => {
        const isReferencedBySettings = docs?.some(
          (doc) => doc._type === 'settings',
        )
        switch (params.type) {
          case 'home':
            return isReferencedBySettings
              ? {
                  locations: [
                    {
                      title:
                        docs?.find((doc) => doc._type === 'home')?.title ||
                        'Home',
                      href: resolveHref(params.type),
                    },
                  ],
                  tone: 'positive',
                  message: 'This document is used to render the front page',
                }
              : {
                  tone: 'critical',
                  message: `The top menu isn't linking to the home page. This might make it difficult for visitors to navigate your site.`,
                }
          case 'page':
            return {
              locations: docs
                ?.map((doc) => {
                  const href = resolveHref(doc._type, doc?.slug?.current)
                  return {
                    title: doc?.title || 'Untitled',
                    href: href,
                  }
                })
                .filter((doc) => doc.href !== undefined),
              tone: isReferencedBySettings ? 'positive' : 'critical',
              message: isReferencedBySettings
                ? 'The top menu is linking to this page'
                : "The top menu isn't linking to this page. It can still be accessed if the visitor knows the URL.",
            }
          case 'project':
            return {
              locations: docs
                ?.map((doc) => {
                  const href = resolveHref(doc._type, doc?.slug?.current)
                  return {
                    title: doc?.title || 'Untitled',
                    href: href,
                  }
                })
                .filter((doc) => doc.href !== undefined),
              tone: isReferencedBySettings ? 'caution' : undefined,
              message: isReferencedBySettings
                ? 'This document is used on all pages as it is in the top menu'
                : undefined,
            }
          default:
            return {
              message: 'Unable to map document type to locations',
              tone: 'critical',
            }
        }
      }),
    )
  }

  return null
}
