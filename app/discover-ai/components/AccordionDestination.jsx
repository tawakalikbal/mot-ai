'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { format, parseISO } from 'date-fns'
import { ChevronDownIcon, Plus } from 'lucide-react'
import { useState } from 'react'
import DraggableCard from './DraggableCard'

const AccordionDestination = ({ itineraryList = [] }) => {
  const [openItem, setOpenItem] = useState('')
  const dateFormatted = (value) => format(parseISO(value), 'EEEE, MMM dd')

  return (
    <Accordion
      type='single'
      collapsible
      className='w-full'
      defaultValue='item-1'
      onValueChange={(value) => setOpenItem(value)}
    >
      {itineraryList?.map((item, index) => (
        <AccordionItem value={`item-${item?.day_number}`} key={index}>
          <AccordionTrigger isHideDefaultIcon className='items-center hover:no-underline'>
            <div className='flex flex-col gap-1'>
              <h3 className='text-xl text-black font-semibold'>
                Day {item?.day_number} - {dateFormatted(item?.date)}
              </h3>
              {openItem === `item-${item}` && <p className='text-gray-500'>{item?.location}</p>}
            </div>
            <ChevronDownIcon className='text-muted-foreground pointer-events-none size-6 shrink-0 translate-y-0.5 transition-transform duration-200' />
          </AccordionTrigger>
          <AccordionContent className='flex flex-col gap-4 text-balance'>
            <div className='flex flex-col gap-4'>
              {item?.events?.map((event, idx) => (
                <DraggableCard key={idx} number={idx + 1} event={event} />
              ))}
            </div>

            <div>
              <Button
                variant='outline'
                className='text-blue-500 border-blue-500 hover:text-blue-500'
              >
                <Plus className='size-4 mr-2' />
                Add Destination
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default AccordionDestination
