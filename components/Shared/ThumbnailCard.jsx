import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const MotionLink = motion(Link)

const ThumbnailCard = ({ title, imageUrl, destinationUrl, alt, index }) => {
  return (
    <MotionLink
      href={destinationUrl}
      target='_blank'
      className='aspect-video relative p-4 rounded-lg shadow-md bg-white cursor-pointer overflow-hidden group'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className='z-0 object-cover rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-120'
        sizes='(max-width: 768px) 200px'
      />

      <div className='absolute z-10 inset-0 flex flex-col items-center justify-end p-6'>
        <p className='font-bold text-center text-xl text-white'>{title}</p>
      </div>
    </MotionLink>
  )
}

export default ThumbnailCard
