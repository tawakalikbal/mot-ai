import { GripVertical, MapPin, Trash2 } from 'lucide-react'
import Image from 'next/image'

const DraggableCard = ({ event, number }) => {
  return (
    <div className='flex flex-col sm:flex-row gap-2 rounded-lg bg-white border items-start sm:items-center p-4 pl-2 hover:shadow-lg transition-shadow duration-300'>
      <div className='flex gap-2 items-center w-full sm:w-auto'>
        <GripVertical className='text-gray-500 size-5 shrink-0 cursor-grab' />
        <div className='relative w-full sm:w-[150px] h-[150px] rounded-lg shadow-md shrink-1 sm:shrink-0'>
          <Image
            src={event?.location?.image_url}
            alt='Bali such a beautiful place'
            className='rounded-lg object-cover'
            sizes='(max-width: 768px) 150px'
            fill
          />
        </div>
      </div>
      <div className='flex gap-2 items-center flex-1 ml-7 sm:ml-0'>
        <div className='flex flex-col gap-2 w-full'>
          <h3 className='text-lg font-semibold text-black'>
            {number}. {event?.location.name}
          </h3>
          <p className='text-gray-500'>{event?.description}</p>
          <div className='flex gap-4 font-semibold'>
            <p className='text-blue-500'>{event?.category}</p>
            <p className='text-gray-700 flex gap-1 items-start'>
              <MapPin className='size-4 shrink-0' />
              {event?.location?.address}
            </p>
          </div>
        </div>
        <Trash2 aria-label='Delete Destination' className='text-gray-500 size-5 cursor-pointer' />
      </div>
    </div>
  )
}

export default DraggableCard
