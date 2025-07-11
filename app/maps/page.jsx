'use client'
import { useState } from 'react'
// import { MapContainer, TileLayer, useMap } from "react-leaflet";
// import dynamic from "next/dynamic";
import { ChatbotWidget } from '@/components/ChatbotWidget'
import { GoogleMap } from '@/components/GoogleMap'
import locations from '@/lib/location.json'
import { ArrowLeft, MapPin, Search, StarsIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRef } from 'react'

// const MapComponent = dynamic(() => import("@/components/LeafletMap"), {
//   ssr: false,
//   loading: () => (
//     <div className="h-96 w-full bg-gray-200 flex items-center justify-center">
//       Loading map...
//     </div>
//   ),
// });

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedPlace, setSelectedPlace] = useState({})
  const chatbotRef = useRef(null)
  // const touristSpots = useMemo(() => locations.tourist_spots, []);
  // const MemoizedGoogleMap = React.memo(GoogleMap);
  const locationId = searchParams.get('locationId')
  const handleClickMarker = (markerData) => {
    setSelectedPlace(markerData)
    const params = new URLSearchParams(searchParams)
    params.set('locationId', markerData.id)
    router.push(`?${params.toString()}`)
  }
  return (
    <div className='h-screen'>
      <ChatbotWidget ref={chatbotRef} />
      {/* <MapComponent /> */}
      {selectedPlace?.id && (
        <MapContent
          selectedPlace={selectedPlace}
          chatbotRef={chatbotRef}
          setSelectedPlace={setSelectedPlace}
        />
      )}
      {!locationId && <MapSearch />}
      <GoogleMap
        key='main-map'
        data={locations.tourist_spots}
        onClickMarker={handleClickMarker}
        className='w-full h-full rounded-lg shadow-lg'
      />
    </div>
  )
}

export const MapContent = ({ selectedPlace, chatbotRef, onEnter, setSelectedPlace }) => {
  const [value, setValue] = useState('')
  return (
    <aside className='bg-white fixed left-10 top-1/2 -translate-y-1/2 z-100 h-auto max-h-[80vh] w-full max-w-[20vw] rounded-xl p-4  flex flex-col gap-4'>
      <section className='relative'>
        <Search className='absolute left-2 top-1/2 -translate-y-1/2' size={16} color='gray' />
        <input
          className='focus:outline-0 border w-full pl-8 pr-4 rounded-md p-1.5'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const newLocation = locations.tourist_spots.find(
                (spot) => spot.name.toLowerCase() === value.toLowerCase()
              )
              setSelectedPlace(newLocation)
            }
          }}
        />
      </section>
      <section className='flex gap-1 items-center cursor-pointer'>
        <ArrowLeft size={20} />
        <p>Back</p>
      </section>
      <section className='overflow-auto scrollbar-hide'>
        <img src={selectedPlace.image} className='aspect-video rounded-xl object-cover mb-5' />
        <p className='text-blue-600 font-semibold text-sm '>{selectedPlace.type}</p>
        <h2 className='font-bold text-xl mb-1'>{selectedPlace.name}</h2>
        <div className='flex text-slate-600 items-center gap-1 mb-2'>
          <MapPin size={16} />
          <p className='text-sm'>{selectedPlace.location}</p>
        </div>
        <p className='whitespace-pre-wrap '>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium commodi libero maxime
          laborum deleniti ratione illum obcaecati odio, at incidunt eligendi cum repellat tenetur
          quae est a voluptatum ipsum hic architecto accusantium nam. Voluptates tempora suscipit
          vel consequatur esse officia facilis ad natus laboriosam excepturi nesciunt dolore
          explicabo nam, distinctio doloremque recusandae ullam nihil, libero error eligendi maxime
          mollitia! Hic nulla laborum quidem, eligendi voluptates mollitia cumque amet, in fugit
          accusantium aliquam beatae ad animi numquam dicta officia delectus nesciunt assumenda, id
          corporis? Voluptatem nam excepturi blanditiis commodi, molestias unde recusandae soluta
          repellendus. Asperiores animi vero quis consequuntur corrupti! Dolorem.
        </p>
      </section>
      <section>
        <button
          className='bg-black text-white w-full rounded-full px-2 py-3 cursor-pointer flex items-center justify-center font-semibold gap-2'
          onClick={() =>
            chatbotRef.current.sendChat(
              `Hi AiYu! Can you tell me more about ${selectedPlace.name}?`
            )
          }
        >
          Ask AiYu
          <StarsIcon size={20} />
        </button>
      </section>
    </aside>
  )
}

export const MapSearch = () => {
  const [value, setValue] = useState('')

  const handleChangeValue = (e) => {
    setValue(e.target.value)
  }

  const chips = [
    {
      title: 'Top Destinations',
      icon: '',
    },
    {
      title: 'Events',
      icon: '',
    },
    {
      title: 'Culinary',
      icon: '',
    },
    {
      title: 'Attractions',
      icon: '',
    },
    {
      title: 'Art & Culture',
      icon: '',
    },
    {
      title: 'Other Filter',
      icon: '',
    },
  ]
  return (
    <>
      <div
        className=' p-2 rounded-2xl bg-transparent  fixed top-[20%] left-1/2 -translate-x-1/2  z-100 w-full max-w-[600px]'
        style={{ boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.20)' }}
      >
        <div className=' bg-white text-black  rounded-lg px-6 py-3'>
          <input
            value={value}
            placeholder='Search destination here'
            onChange={(e) => handleChangeValue(e)}
            className='focus:outline-0  w-full'
          />
        </div>
      </div>
      <div className='flex gap-2 fixed top-[30%] left-1/2 -translate-x-1/2 z-100 '>
        {chips.map(({ title, icon }) => (
          <div className='bg-black shadow-xl text-white px-3 py-2 rounded-full' key={title}>
            <p className='text-sm'>{title}</p>
          </div>
        ))}
      </div>
    </>
  )
}
