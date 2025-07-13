import { itinerary } from '@/data/itinerary'
import { format, parseISO } from 'date-fns'
import { CalendarDays, Settings } from 'lucide-react'
import AccordionDestination from './components/AccordionDestination'

const DiscoverAI = () => {
  const dateFormatted = (value) => format(parseISO(value), 'dd MMM, yyyy')

  return (
    <div className='container mx-auto px-4 md:px-0 bg-white flex gap-4 mb-10 mt-30'>
      <section id='main-content' className='w-full sm:w-[60%]'>
        <section className='relative h-[300px] rounded-lg'>
          <img
            src={itinerary?.trip_image_url}
            alt={itinerary?.trip_name}
            className='w-full h-full object-cover rounded-lg'
          />
          <div className='absolute inset-0 bg-black opacity-50 rounded-lg'></div>
          <div className='absolute inset-0 flex flex-col justify-between p-6 text-white'>
            <div className='flex justify-end'>
              <div
                className='p-2 rounded-full bg-white cursor-pointer'
                aria-label='Setting Destination'
              >
                <Settings className='text-black size-5' />
              </div>
            </div>
            <div>
              <h1 className='text-4xl font-bold'>{itinerary?.trip_name}</h1>
              <div className='flex gap-2 items-center'>
                <CalendarDays className='text-white size-4' />
                <p className='text-lg'>
                  {dateFormatted(itinerary.start_date)} - {dateFormatted(itinerary.end_date)}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <AccordionDestination itineraryList={itinerary?.days} />
        </section>
      </section>
      <section id='destination-map' className='hidden sm:w-[40%] sm:block h-screen'>
        <iframe
          src='https://www.google.com/maps?q=-8.7177,115.1691&z=15&output=embed'
          width='100%'
          height='100%'
          loading='lazy'
          allowFullScreen
          className='border-0 rounded-lg'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      </section>
    </div>
  )
}

export default DiscoverAI
