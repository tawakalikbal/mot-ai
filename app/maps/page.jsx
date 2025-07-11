'use client'
import { useState } from 'react'
// import { MapContainer, TileLayer, useMap } from "react-leaflet";
// import dynamic from "next/dynamic";
import { ChatbotWidget } from '@/components/ChatbotWidget'
import { GoogleMap } from '@/components/GoogleMap'
import locations from '@/lib/location.json'
import { useRouter, useSearchParams } from 'next/navigation'

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
      <ChatbotWidget />
      {/* <MapComponent /> */}
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
