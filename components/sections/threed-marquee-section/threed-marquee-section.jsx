import Image from 'next/image'
import { Suspense } from 'react'

import { urlForImage } from '@/sanity/lib/utils'
import { loadClients } from '@/sanity/loader/loadQuery'

import styles from './styles.module.css' // Update the path according to your file structure

const ClientCard = () => {
  return (
    <li key={key}>
      <div className={styles.item}>
        <div className={styles.item__icon}>
          <Image
            width={client.image.asset.metadata.dimensions.width}
            height={client.image.asset.metadata.dimensions.height}
            src={client.image.asset.url}
            alt={client.name + ' logo'}
          />
        </div>
      </div>
    </li>
  )
}

const ThreeDMarqueeSection = async () => {
  const clients = await loadClients()

  return (
    <Suspense>
      <div className={styles.window}>
        <div className={styles.scene}>
          <ul className={styles.grid}>
            {clients.data.map((client, key) => {
              console.log(client.image.asset.metadata.dimensions)
              return (
                <Suspense key={key} fallback={<ClientCard />}>
                  <li>
                    <div className={styles.item}>
                      <div className={styles.item__icon}>
                        <Image
                          width={client.image.asset.metadata.dimensions.width}
                          height={client.image.asset.metadata.dimensions.height}
                          src={client.image.asset.url}
                          alt={client.name + ' logo'}
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
    </Suspense>
  )
}

export default ThreeDMarqueeSection
