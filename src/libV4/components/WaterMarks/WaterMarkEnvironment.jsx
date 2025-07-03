import { Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@emotion/react'

const WaterMarkEnvironment = () => {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.up('xs'))
  const isMd = useMediaQuery(theme.breakpoints.up('md'))
  const isXl = useMediaQuery(theme.breakpoints.up('xl'))

  const getVariant = () => {
    if (isXl) return 'h2'
    if (isMd) return 'h3'
    if (isXs) return 'h4'
    return 'h2'
  }
  // rgba(0,0,0,0.1)

  return (
    <div className='fixed bottom-5 right-5 pointer-events-none'>
      <Typography
        variant={getVariant()}
        color='rgba(0,0,0,0.1)'
      >
        Ambiente de prueba
      </Typography>
    </div>
  )
}

export default WaterMarkEnvironment
