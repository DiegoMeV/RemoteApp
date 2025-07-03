import { formatToLocaleDate } from '@/lib'
import { Box, LinearProgress, Typography } from '@mui/material'
import React from 'react'

const LoadingMassive = ({ queueInfo }) => {
  return (
    <Box
      position='absolute'
      top={0}
      left={0}
      width='100%'
      height='100%'
      bgcolor='rgba(0, 0, 0, 0.6)'
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      zIndex={1}
    >
      <Box
        p={3}
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        bgcolor='primary.main'
        borderRadius='16px'
        boxShadow='0px 4px 20px rgba(0, 0, 0, 0.2)'
      >
        <Typography
          variant='h6'
          color='backgroundWhite1'
          mt={2}
        >
          Actualmente existe una ejecución del proceso <br />
          Comienzo: {formatToLocaleDate(queueInfo?.[0]?.startDate ?? queueInfo?.[0]?.fechaInicio)}
        </Typography>
        <Box
          width='80%'
          mt={2}
        >
          {queueInfo?.[0]?.queueData ? (
            <>
              <LinearProgress
                variant='determinate'
                value={queueInfo?.[0]?.queueData?.progress?.progressPercent}
                color='secondary'
              />
              <Typography
                variant='body2'
                color='backgroundWhite1'
                mt={1}
              >
                {queueInfo?.[0]?.queueData?.progress?.progressPercent || '0'}% completado
              </Typography>
            </>
          ) : (
            <>
              <LinearProgress color='secondary' />
              <Typography
                variant='body2'
                color='backgroundWhite1'
                mt={1}
              >
                En proceso...
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default LoadingMassive
