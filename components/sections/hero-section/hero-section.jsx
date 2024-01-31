'use client'
import Image from 'next/image'
import Link from 'next/link'

import figma from '@/public/images/figma.svg'
import herobg from '@/public/images/hero-bg.png'
import javascript from '@/public/images/javascript.svg'
import mongodb from '@/public/images/mongodb.svg'
import next from '@/public/images/nextjs.svg'
import node from '@/public/images/nodejs.svg'
import postgres from '@/public/images/postgres.svg'
import react from '@/public/images/react.svg'
import remix from '@/public/images/remix.svg'
import shopify from '@/public/images/shopify.svg'

import styles from './styles.module.css'

export default function HeroSection() {
  const icons = [
    figma,
    javascript,
    mongodb,
    next,
    node,
    postgres,
    react,
    remix,
    shopify,
  ]

  return (
    <section className="text-left relative py-20 bg-gray-900 overflow-hidden h-screen ">
      <Image
        className="z-0 opacity-35"
        src={herobg}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt="Background image"
      />
      <div className="relative z-10 px-5 md:px-10 ">
        <h1 className=" opacity-0 animate-fade-in text-6xl md:text-8xl drop-shadow-[0_5px_5px_rgba(0,0,0,0.95)] text-white  uppercase mb-4">
          Logan Gelzer
        </h1>
        <p className=" opacity-0 animate-fade-in text-lg md:text-al drop-shadow-[0_5px_5px_rgba(0,0,0,0.95)] text-white mb-16 pb-8">
          An ecommerce expert for over 12 years.
        </p>
        <ul className=" opacity-0 animate-fade-in text-2xl md:text-4xl drop-shadow-[0_5px_5px_rgba(0,0,0,0.95)] text-white  uppercase pb-12">
          <li className="pl-2">Shopify Expert</li>
          <li className="pl-6">Full Stack Developer</li>
          <li className="pl-12">UI/UX Designer</li>
        </ul>
        <Link
          className="opacity-0 animate-fade-in ml-4 border   bg-green-500  text-white px-6 py-2 rounded-full"
          href="#projects"
        >
          See my work
        </Link>
        <Link
          className="opacity-0 animate-fade-in ml-4 border bg-green-50 bg-opacity-10 border-green-500  text-white px-6 py-2 rounded-full"
          href="/?modal=true"
        >
          See my Bio
        </Link>

        <div className={styles.iconContainer}>
          {icons.map((Icon, i) => {
            const angle = ((2 * Math.PI) / icons.length) * i
            const left = 50 + 50 * Math.cos(angle) // Convert to percentage
            const top = 50 + 50 * Math.sin(angle) // Convert to percentage
            return (
              <Image
                key={i}
                className={styles.icon}
                src={Icon}
                alt={Icon + ' icon'}
                style={{
                  position: 'absolute',
                  top: `${top}%`,
                  left: `${left}%`,
                }}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
function Modal() {
  return (
    <div>
      <h1>I am a modal</h1>
      <Link href="/">Close</Link>
    </div>
  )
}
