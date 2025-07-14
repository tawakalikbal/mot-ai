import { useState } from 'react'
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
