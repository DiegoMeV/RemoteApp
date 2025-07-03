import { Typography } from '@mui/material'
import PopoverDownload from './PopoverDownload'
import { getParams } from './funcs'

const HistoricalTimeLine = ({ infoActivities }) => {
  const info = infoActivities?.flatMap?.((stage) => stage?.activities)

  return (
    <div className='w-full flex flex-col gap-4 pt-8'>
      {info?.map?.((activity, index) => {
        const { isCompleted, isLastActivity } = getParams(activity, info, index)
        return (
          <>
            <div
              key={index}
              className='w-full flex items-center justify-between'
            >
              {/* Left */}
              <div className='flex-1 flex justify-center'>
                <div>
                  <Typography>{activity?.Task?.name ?? ''}</Typography>
                  <PopoverDownload />
                </div>
              </div>

              {/* Center */}
              <div className='w-[62px] h-[62px] flex items-center justify-center relative'>
                <div
                  className={`absolute inset-0 rounded-full ${
                    isCompleted
                      ? 'bg-[radial-gradient(circle_at_center,_#4CDA63_0%,_#60D965_1%,_#4CAF50_100%)]'
                      : 'bg-[radial-gradient(circle_at_center,_#FFFFFF_0%,_#C8C2C1_1%,_#909090_100%)]'
                  }`}
                />
                <Typography
                  fontSize='1.5rem'
                  color='white'
                  className='relative z-10'
                >
                  {index + 1}
                </Typography>
              </div>

              {/* Right */}
              <div className='flex-1 flex justify-center'>
                <Typography>
                  {isCompleted ? new Date(activity?.completedAt).toLocaleString() : 'En proceso'}
                </Typography>
              </div>
            </div>
            {!isLastActivity && (
              <div className='h-[25px] flex justify-center'>
                <div className='w-[2px] h-full bg-[#4CDA63]' />
              </div>
            )}
          </>
        )
      })}
    </div>
  )
}
export default HistoricalTimeLine
