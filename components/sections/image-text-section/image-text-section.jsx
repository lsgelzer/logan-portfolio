import Image from 'next/image'

import ScheduleACallButton from '@/components/shared/schedule-a-call-button/schedule-a-call-button'
import LoganPic from '@/public/images/logan-author.png'

const ImageTextSection = () => {
  return (
    <section className="flex flex-col md:flex-row my-20">
      <div className=" w-full md:w-1/2 relative h-auto">
        <div className="w-full  p-6 md:p-10">
          <p className=" mb-4">
            Hey there! I&apos;m Logan, based in Miami Florida, and my 12-year
            adventure in eCommerce has been nothing short of a wild ride. It all
            started in customer service and sales at this cool online training
            company. Before I knew it, I was the go-to guy running the whole
            show, jazzing up the website with WooCommerce, throwing in some
            nifty automations, and even adding a Learning Management System –
            pretty neat stuff!
          </p>
          <p className=" mb-4">
            Then, I joined an eCommerce agency. Picture this: managing projects
            for websites on WordPress, Shopify, WooCommerce, and BigCommerce. It
            was like a digital playground, and I loved every bit of it. Plus, I
            got to brush up on my design and programming skills, jumping in to
            help the team whenever needed – like a tech superhero!
          </p>
          <p className=" mb-4">
            The real game-changer was when I joined a food brand, also in Miami.
            I took their eCommerce channel from a tiny $200 to a whopping
            $250,000 a month in sales across three channels – all in just two
            years. Talk about a high score!{' '}
          </p>
          <p className="mb-4 pb-8">
            When COVID hit, I dove into the world of freelancing and, let me
            tell you, it&apos;s been an absolute blast. The freedom, the
            excitement, and yes, the financial perks – freelancing&apos;s got it
            all. So, here I am, still riding the eCommerce wave, one freelance
            gig at a time. It&apos;s been an awesome journey, and I can&apos;t
            wait to see what&apos;s next!
          </p>
        </div>
      </div>
      <div className="relative  w-full md:w-1/2 h-auto flex justify-center items-center">
        <Image src={LoganPic} alt="Logan Image" width={350} height={500} />
      </div>
    </section>
  )
}

export default ImageTextSection
