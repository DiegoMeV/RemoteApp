import { useEffect, useState } from 'react'

const CustomCarrousel = ({ cards }) => {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => setCurrent((prev) => (prev + 1) % cards.length)
  const prevSlide = () => setCurrent((prev) => (prev - 1 + cards.length) % cards.length)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % cards.length)
    }, 3000)

    return () => clearInterval(interval) // Cleanup on unmount
  }, [cards.length])

  return (
    <div className='relative w-full mx-auto overflow-hidden'>
      <div
        className='flex w-full transition-transform duration-500 ease-in-out'
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {cards.map((card, index) => (
          <img
            key={index}
            src={card.image}
            alt={`Slide ${index}`}
            className='w-full h-auto flex-shrink-0'
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className='absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full'
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className='absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full'
      >
        ▶
      </button>

      {/* Dots */}
      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2'>
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${current === index ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default CustomCarrousel
