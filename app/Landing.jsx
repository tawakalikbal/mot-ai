'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import SearchAI from '@/components/Shared/SearchAI'
import ThumbnailCard from '@/components/Shared/ThumbnailCard'
import { destinations } from '@/data/destinations'

const Landing = () => {
  const [searchValue, handleSearch] = useState('')
  const router = useRouter()

  const handleDiscoverAI = () => {
    if (!searchValue) return
    router.push(`/discover-ai?destination=${encodeURIComponent(searchValue)}`)
  }

  return (
    <div>
      <section className='w-full bg-center bg-cover bg-no-repeat relative aspect-[1/1] lg:aspect-[16/4]'>
        <div className='w-full absolute top-0 aspect-[1/1] lg:aspect-[16/4]'>
          <video autoPlay muted className='w-full h-full object-cover'>
            <source src="/video/mot-opening-video.mp4" type="video/mp4"></source>
          </video>
        </div>
        <div className='w-full px-4 md:px-0 flex items-center justify-center aspect-[1/1] lg:aspect-[16/4] absolute top-0'>
          <motion.div
            className='flex flex-col gap-8'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          >
            <div className='flex flex-col gap-2 text-center'>
              <h1 className='text-4xl text-white font-bold'>Where’s your next adventure?</h1>
              <h2 className='text-base text-gray-100'>
                Tell us where you're going, and we’ll build the perfect travel plan just for you.
              </h2>
            </div>
            <SearchAI
              value={searchValue}
              handleChange={(e) => handleSearch(e.target.value)}
              handleClick={handleDiscoverAI}
            />
          </motion.div>
        </div>
      </section>
      <section className='container px-4 mx-auto flex flex-col gap-6 py-10'>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className='text-2xl font-bold leading-[1]'
        >
          Or get started with most popular destinations
        </motion.h2>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 lg:gap-6'>
          {destinations?.map((item, index) => (
            <ThumbnailCard
              key={item.id}
              title={item?.title}
              imageUrl={item?.imageUrl}
              destinationUrl={item?.destinationUrl}
              alt={item?.alt}
              index={index}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Landing
