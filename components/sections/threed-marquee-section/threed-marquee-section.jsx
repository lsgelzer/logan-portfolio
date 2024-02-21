import Image from 'next/image'
import { Suspense } from 'react'

import { loadClients } from '@/sanity/loader/loadQuery'

import styles from './styles.module.css' // Update the path according to your file structure

const ClientCard = ({ key }) => {
  return (
    <li key={key}>
      <div className={styles.item}>
        <div className={styles.item__icon}></div>
      </div>
    </li>
  )
}

const ThreeDMarqueeSection = async () => {
  const clients = await loadClients()

  return (
    <div className="container mx-auto my-8 p-8 ">
      <h2 className="text-4xl uppercase  font-bold mb-2 text-right">
        Current & Previous Clients
      </h2>
      <div>
        <p className="text-xl pb-8 max-w-md mb-8 text-right ml-auto">
          For over 12 years, I&apos;ve been on this super fun journey working
          with all sorts of brands in ecommerce, from cool startups to some of
          the biggest names out there. It&apos;s been like a rollercoaster ride,
          getting to know the ins and outs of both small and huge companies, and
          honestly, it&apos;s been a blast!
        </p>
      </div>
      <div className={styles.window}>
        <div className={styles.scene}>
          <ul className={styles.grid}>
            {clients.data.map((client, key) => {
              return (
                <Suspense key={key} fallback={<ClientCard />}>
                  <li>
                    <div className={styles.item}>
                      <div className={styles.item__icon}>
                        <Image
                          width={client.image.asset.metadata.dimensions.width}
                          height={client.image.asset.metadata.dimensions.height}
                          src={client.image.asset.url}
                          alt={client.client + ' logo'}
                        />
                      </div>
                    </div>
                  </li>
                </Suspense>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ThreeDMarqueeSection
