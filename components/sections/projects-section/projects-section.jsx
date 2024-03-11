'use client'
import 'swiper/css'
import './swiper-styles.css'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { CustomPortableText } from '@/components/shared/CustomPortableText'

import styles from './styles.module.css'

const ProjectsSection = ({ projects }) => {
  return (
    <>
      <section
        id="projects"
        className=" w-full overflow-hidden flex flex-col md:flex-row md:py-8 md:my-8  "
      >
        <div
          className={
            styles.titleContainer +
            ' mx-auto md:pt-8 px-4 flex flex-col justify-center'
          }
        >
          <h2 className="text-4xl font-bold mb-2">Recent Projects</h2>
          <p className="text-xl max-w-md ">
            I&apos;ve been on an exciting adventure, tackling a variety of web
            development projects for Shopify, where each one is a creative
            playground. From jazzing up themes to really make them shine, to
            weaving in clever plugins that ramp up sales and make shopping a
            breeze, every project is a chance to innovate. It&apos;s been a
            blast crafting these standout online stores, each with its own
            flair, ensuring they not only catch the eye but also deliver a
            smooth, memorable shopping experience.
          </p>
        </div>
        <div className={styles.sliderContainer}>
          <Swiper
            spaceBetween={0}
            slidesPerView={2}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            modules={[Autoplay]}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {projects.data.map((project, key) => {
              return (
                <SwiperSlide key={key}>
                  <ProjectCard project={project} />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </section>
    </>
  )
}
export default ProjectsSection

const ProjectCard = ({ project, encodeDataAttribute }) => {
  const {
    title,
    coverImage,
    client,
    clientImage,
    duration,
    present,
    site,
    tags,
    overview,
  } = project
  const startYear = new Date(duration?.start).getFullYear()
  const endYear = duration?.end ? new Date(duration?.end).getFullYear() : 'Now'

  const [isOpen, setIsOpen] = useState(false)
  const openModal = (project) => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div className=" h-full overflow-hidden relative  ">
        <Image
          className="projectCardImage"
          src={coverImage.asset.url}
          width={coverImage.asset.metadata.dimensions.width}
          height={coverImage.asset.metadata.dimensions.height}
          alt={client}
        />
        <div className="project-card__image__overlay absolute top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden bg-white">
          <Image
            className="absolute  transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-6 md:h-8 w-auto"
            src={clientImage.asset.url}
            width={clientImage.asset.metadata.dimensions.width}
            height={clientImage.asset.metadata.dimensions.height}
            alt={client}
          />
        </div>
        <div className=" bg-gray-200 bg-opacity-80  tags p-2 opacity-0 flex absolute bottom-0  flex-wrap w-full  items-start justify-start">
          {client && (
            <h3 className="text-3xl pl-1  w-full font-bold">{client}</h3>
          )}
          {duration && !!(startYear && endYear) && (
            <div className="p-1 block w-full">
              <div className="text-md md:text-lg">
                <span data-sanity={encodeDataAttribute?.('duration.start')}>
                  {startYear}
                </span>
                {' - '}
                <span data-sanity={encodeDataAttribute?.('duration.end')}>
                  {present ? 'Present' : endYear}
                </span>
              </div>
            </div>
          )}
          {tags.map((tag, key) => {
            return (
              <p
                className=" md:bg-purple-900 text-sm font-thin w-auto md:text-white inline px-1 py-1 md:px-2 md:m-1  mb-0 rounded-full"
                key={key}
              >
                {tag}
              </p>
            )
          })}
          <div className="w-full flex">
            <button onClick={openModal} className="underline ml-auto">
              View Project
            </button>
          </div>
        </div>
      </div>
      <div
        className={` bg-green-500 fixed z-10 inset-0 overflow-y-auto h-full w-full transition-opacity duration-500 ease-in-out  p-4 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <button
          className="absolute top-2 right-2 md:top-4 md:right-4"
          onClick={closeModal}
        >
          Close
        </button>
        {client && <h2 className="text-4xl">{client}</h2>}
        {duration && !!(startYear && endYear) && (
          <div className="p-3 lg:p-4">
            <div className="text-md md:text-lg">
              <span data-sanity={encodeDataAttribute?.('duration.start')}>
                {startYear}
              </span>
              {' - '}
              <span data-sanity={encodeDataAttribute?.('duration.end')}>
                {present ? 'Present' : endYear}
              </span>
            </div>
          </div>
        )}
        {overview && <CustomPortableText value={overview} />}
        {site && (
          <Link
            className="text-center underline block w-full pt-2"
            href={site}
            target="_blank"
          >
            Visit {client}{' '}
          </Link>
        )}
      </div>
    </>
  )
}
