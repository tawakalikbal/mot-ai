'use client'

// import { itinerary } from '@/data/itinerary'
import { ChatbotWidget } from "@/components/ChatbotWidget"
// import { GoogleMap } from '@/components/Shared/GoogleMap'
import { getItinerary } from "@/utils/apiUtils"
import { getOrCreateSessionId, getOrCreateUserId } from '@/utils/session'
import { format, isValid, parseISO } from 'date-fns'
import { CalendarDays, Settings } from 'lucide-react'
import { useEffect, useRef, useState } from "react"
import AccordionDestination from './components/AccordionDestination'

const DiscoverAI = () => {
  const chatbotRef = useRef()
  const dateFormatted = (value) => {
    if (!value) return ''
    const parsed = parseISO(value)
    if (!isValid(parsed)) return ''
    return format(parsed, 'EEEE, MMM dd')
  }
  const [uid, setUid] = useState(null)
  const [sid, setSid] = useState(null)
  const [loading, setLoading] = useState(false)
  const [itinerary, setItinerary] = useState({})
  const [state, setState] = useState({})

  const handleUpdateItinerary = (newData) => {
    setItinerary(newData);
  };

  useEffect(() => {
    const userId = getOrCreateUserId();
    const sessionId = getOrCreateSessionId();

    setUid(userId);
    setSid(sessionId);

    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await getItinerary(userId, sessionId);
        console.log(res.state)
        setState(res.state)
        // setItinerary(res)
        setLoading(false)
      } catch (err) {
        console.error("Gagal ambil data");
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("itinerary updated:", itinerary);
  }, [itinerary]);

  useEffect(() => {
    if (state.itinerary) {
      setItinerary(state.itinerary)
    }
  }, [state]);

  return (
    <>
    <ChatbotWidget ref={chatbotRef} onItineraryUpdate={(data) => setItinerary(data)} />
    <div className='container mx-auto px-4 2xl:px-0 bg-white flex flex-col gap-4 mb-10 mt-30'>
      <section className='relative h-[300px] rounded-lg'>
        <img
          src={'/images/destinations/sulawesi.jpg'}
          alt={itinerary?.trip_name || "Trip image"}
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
          <div className='absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center flex flex-col'>
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
      <section id='main-content' className='w-full flex gap-10'>
        <section className='w-full md:w-[60%]'>
          <AccordionDestination chatbotRef={chatbotRef} itineraryList={itinerary?.days} />
        </section>
        <section id='destination-map' className='hidden w-[40%] sm:block h-screen'>
          {/* <GoogleMap
            key='main-map'
            data={locations.tourist_spots}
            onClickMarker={handleClickMarker}
            className='w-full h-full rounded-lg shadow-lg'
          /> */}
        </section>
      </section>
    </div>
    <div className={`fixed z-101 top-0 right-0 bottom-0 left-0 bg-black/75 flex items-center justify-center ${loading ? '' : 'hidden'}`}>
        <span className="loading loading-spinner loading-xl text-white"></span>
    </div>
    </>
  )
}

export default DiscoverAI
