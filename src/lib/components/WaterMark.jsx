import { Box, Typography, useMediaQuery } from '@mui/material'
import { waterMarkStyles } from '../styles'
import { useTheme } from '@emotion/react'

const WaterMark = () => {
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

  return (
    <Box sx={waterMarkStyles}>
      <Typography variant={getVariant()}>Ambiente de prueba</Typography>
    </Box>
  )
}

export default WaterMark
