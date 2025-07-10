const SearchAI = ({ handleClick, value, handleChange }) => {
  return (
    <div className='bg-white w-full max-2xl flex items-center gap-2 px-4 py-2 rounded-md'>
      <input
        type='text'
        placeholder='Enter your destination here'
        className='w-full h-8 rounded-lg text-base text-gray-500 outline-none'
        value={value}
        onChange={handleChange}
      />
      <button
        onClick={handleClick}
        className='rounded-md bg-gradient-to-r from-cyan-400 to-green-500 px-4 py-2 text-white text-base flex gap-1 items-center cursor-pointer'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='18'
          height='18'
          viewBox='0 0 24 24'
          fill='white'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='lucide lucide-sparkles-icon lucide-sparkles'
        >
          <path d='M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z' />
          <path d='M20 3v4' />
          <path d='M22 5h-4' />
          <path d='M4 17v2' />
          <path d='M5 18H3' />
        </svg>
        Start
      </button>
    </div>
  )
}

export default SearchAI
