import { PortableText } from '@portabletext/react'
import { Image } from 'sanity'

export function CustomPortableText({ paragraphClasses, value }) {
  const components = {
    block: {
      normal: ({ children }) => {
        return <p className={paragraphClasses}>{children}</p>
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            className="underline transition hover:opacity-50"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        )
      },
    },
  }

  return <PortableText components={components} value={value} />
}
