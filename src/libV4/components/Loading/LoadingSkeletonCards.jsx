import { Skeleton } from '@mui/material'

const LoadingSkeletonCards = ({ variant = 'rectangular', height = 80, amount = 6 }) => {
  return (
    <div className='grid grid-cols-12 gap-5 w-full'>
      {[...Array(amount)].map((_, index) => (
        <div
          key={index}
          className='xs:col-span-12 lg:col-span-6 2xl:col-span-4'
        >
          <Skeleton
            variant={variant}
            height={height}
            width='100%'
            sx={{ borderRadius: '20px' }}
          />
        </div>
      ))}
    </div>
  )
}

export default LoadingSkeletonCards
