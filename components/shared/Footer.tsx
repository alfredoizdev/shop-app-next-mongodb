import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='flex flex-col items-center justify-center bg-gray-50 py-12 border-1'>
      <section>
        <p className='text-gray-800 text-lg text-center px-4 md:px-12 py-4 md:py-6'>
          Made with love by Alfredo Izquierdo
        </p>
      </section>
      <section>
        <h2 className='text-gray-800 text-lg text-center px-4 md:px-12 py-4 md:py-6'>
          follow us on
        </h2>
        <div className='flex gap-4 justify-center items-center'>
          <Link href={'https://www.facebook.com/'} target='_blank'>
            <Image
              src={'/svg/facebook-dark.svg'}
              alt='Facebook'
              width={24}
              height={24}
            />
          </Link>
          <Link
            href={
              'https://www.instagram.com/keyyoungcollection/?igsh=MXN0OHdnbHVseGY5dA%3D%3D&utm_source=qr#'
            }
            target='_blank'
          >
            <Image
              src={'/svg/instagram-dark.svg'}
              alt='Instagram'
              width={24}
              height={24}
            />
          </Link>
          <Link href={'https://www.twich.com/'} target='_blank'>
            <Image
              src={'/svg/twitch-dark.svg'}
              alt='Twitch'
              width={24}
              height={24}
            />
          </Link>
        </div>
      </section>
      <section>
        <p className='text-gray-700 text-sm text-center px-4 md:px-12 py-4 md:py-6'>
          © {currentYear} Alfredo Izquierdo. All rights reserved.
        </p>
      </section>
    </footer>
  )
}

export default Footer
