'use client'
import { useState } from 'react'
// import { MapContainer, TileLayer, useMap } from "react-leaflet";
// import dynamic from "next/dynamic";
import { ChatbotWidget } from '@/components/ChatbotWidget'
import { GoogleMap } from '@/components/Shared/GoogleMap'
import locations from '@/lib/location.json'

import { useRouter, useSearchParams } from 'next/navigation'
import { useRef } from 'react'

import { MapContent } from '@/components/page-components/maps/MapContent'
import { MapSearch } from '@/components/page-components/maps/MapSearch'
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
