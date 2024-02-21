'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import figma from '@/public/images/figma.svg'
import herobg from '@/public/images/hero-bg.png'
import javascript from '@/public/images/javascript.svg'
import loganPic from '@/public/images/logan-author.png'
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
  const [isOpen, setIsOpen] = useState(false)
  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <section className="text-left relative py-20 bg-white overflow-hidden h-screen ">
        <div className={`${styles.bgOverlay} absolute inset-0 `}></div>
        <Image
          priority
          className="z-0 "
          src={herobg}
          fill
          style={{
            objectFit: 'cover',
          }}
          alt="Background image"
        />
        <div className="relative z-5 px-5 md:px-10 z-10">
          <h1 className="z-20 font-openSans font-bold opacity-0 animate-fade-in text-5xl md:text-8xl  text-black  uppercase mb-4">
            Logan Gelzer
          </h1>
          <p className=" z-20 font-bold opacity-0 animate-fade-in text-lg md:text-al  text-black mb-16 pb-8">
            An ecommerce expert for over 12 years.
          </p>
          <ul className=" z-20 font-openSans font-bold opacity-0 animate-fade-in text-2xl md:text-4xl  text-black  uppercase pb-12">
            <li className="pl-2">Shopify Expert</li>
            <li className="pl-6">Software Developer</li>
            <li className="pl-12">UI/UX Designer</li>
          </ul>
          <Link
            className="font-openSans font-bold opacity-0 animate-fade-in ml-4 border   bg-green-500  text-black px-6 py-2 rounded-full"
            href="#projects"
          >
            Recent Projects
          </Link>
          <button
            className="font-openSans font-bold opacity-0 animate-fade-in ml-4 border bg-green-50 bg-opacity-10 border-green-500  text-black px-6 py-2 rounded-full"
            onClick={toggleModal}
          >
            About Me
          </button>
        </div>
        <div className={styles.iconContainer}>
          {icons.map((Icon, i) => {
            const angle = ((2 * Math.PI) / icons.length) * i
            const left = 50 + 50 * Math.cos(angle) // Convert to percentage
            const top = 50 + 50 * Math.sin(angle) // Convert to percentage
            return (
              <Image
                priority
                key={i}
                className={styles.icon}
                src={Icon}
                alt={'icon'}
                style={{
                  position: 'absolute',
                  top: `${top}%`,
                  left: `${left}%`,
                }}
              />
            )
          })}
        </div>
      </section>
      <div
        className={`fixed z-10 inset-0 overflow-y-auto h-full w-full transition-opacity duration-500 ease-in-out bg-black bg-opacity-50 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div
          className="flex items-center justify-center min-h-screen p-0 md:p-2
          
          
          "
        >
          {/* ... */}
          <div className="relative flex-col-reverse items-center align-bottom bg-white md:rounded-lg text-left h-screen w-screen md:h-full md:w-1/2 p-2 md:p-8 overflow-auto flex">
            <button
              className="absolute top-2 right-2 md:top-4 md:right-4"
              onClick={toggleModal}
            >
              Close
            </button>
            <Image src={loganPic} alt="Logan Gelzer" height={300} width={300} />
            <div>
              <h2 className="text-4xl mb-4">About Me</h2>

              <p className="pb-2">
                Hey there! I&apos;m Logan, based in Miami Florida, and my
                12-year adventure in eCommerce has been nothing short of a wild
                ride. It all started in customer service and sales at this cool
                online training company. Before I knew it, I was the go-to guy
                running the whole show, jazzing up the website with WooCommerce,
                throwing in some nifty automations, and even adding a Learning
                Management System – pretty neat stuff!
              </p>
              <p className="pb-2">
                Then, I joined an eCommerce agency. Picture this: managing
                projects for websites on WordPress, Shopify, WooCommerce, and
                BigCommerce. It was like a digital playground, and I loved every
                bit of it. Plus, I got to brush up on my design and programming
                skills, jumping in to help the team whenever needed – like a
                tech superhero!
              </p>
              <p className="pb-2">
                The real game-changer was when I joined a food brand, also in
                Miami. I took their eCommerce channel from a tiny $200 to a
                whopping $250,000 a month in sales across three channels – all
                in just two years. Talk about a high score!
              </p>
              <p className="pb-2">
                When COVID hit, I dove into the world of freelancing and, let me
                tell you, it&apos;s been an absolute blast. The freedom, the
                excitement, and yes, the financial perks – freelancing&apos;s
                got it all. So, here I am, still riding the eCommerce wave, one
                freelance gig at a time. It&apos;s been an awesome journey, and
                I can&apos;t wait to see what&apos;s next!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
