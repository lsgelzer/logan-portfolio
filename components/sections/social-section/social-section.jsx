import Image from 'next/image'

import facebook from '../../../public/images/facebook.svg'
import github from '../../../public/images/github.svg'
import instagram from '../../../public/images/instagram.svg'
import linkedin from '../../../public/images/linkedin.svg'
import mail from '../../../public/images/mail.svg'
import twitter from '../../../public/images/twitter.svg'

const SocialSection = () => {
  return (
    <div className="container  m-auto p-4 md:p-8">
      <h2 className="text-4xl font-bold text-center ">Connect with me</h2>

      <div className="flex mt-8  p-2 md:p-8 mw-80 justify-evenly">
        <a
          href="https://github.com/lsgelzer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="w-8 md:w-12"
            height={50}
            width={50}
            src={github}
            alt="Github"
          />
        </a>
        <a
          href="https://www.facebook.com/lsgelzer/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="w-8 md:w-12"
            height={50}
            width={50}
            src={facebook}
            alt="Facebook"
          />
        </a>
        <a
          href="https://twitter.com/logangelzer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="w-8 md:w-12"
            height={50}
            width={50}
            src={twitter}
            alt="X"
          />
        </a>
        <a
          href="https://www.instagram.com/logangelzer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="w-8 md:w-12"
            height={50}
            width={50}
            src={instagram}
            alt="Instagram"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/logan-gelzer/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="w-8 md:w-12"
            height={50}
            width={50}
            src={linkedin}
            alt="LinkedIn"
          />
        </a>

        <a
          href="mailto:hello@logangelzer.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="w-8 md:w-12"
            height={50}
            width={50}
            src={mail}
            alt="email"
          />
        </a>
      </div>
    </div>
  )
}
export default SocialSection
