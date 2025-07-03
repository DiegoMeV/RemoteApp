import { Skeleton } from '@mui/material'

const LoadingSkeleton = ({ variant = 'rectangular', height = 80, amount = 6 }) => {
  return (
    <div className='mt-4 flex flex-col gap-4'>
      {[...Array(amount)].map((_, index) => (
        <Skeleton
          key={index}
          variant={variant}
          height={height}
        />
      ))}
    </div>
  )
}

export default LoadingSkeleton
