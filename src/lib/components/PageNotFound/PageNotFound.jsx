import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import { containerPageNotFound } from './styles/styles'

import { useNavigate } from 'react-router-dom'
import { useTheme } from '@emotion/react'

const PageNotFound = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isSM = useMediaQuery(theme.breakpoints.up('sm'))
  const isMD = useMediaQuery(theme.breakpoints.up('md'))

  const selectBackground = () => {
    if (isMD) {
      return '/assets/img/pageNotFoundDesktop.png'
    }
    if (isSM) {
      return '/assets/img/pageNotFoundTablet.png'
    }
    return '/assets/img/pageNotFoundMobile.png'
  }
  const size = isMD ? { height: 182, width: 300 } : { height: 160, width: 264 }

  return (
    <Box sx={containerPageNotFound}>
      <Box
        display='flex'
        position='relative'
        overflow='hidden'
        width={'1440px'}
        justifyContent='center'
      >
        <img
          src={selectBackground()}
          alt={selectBackground()}
          style={{
            maxWidth: isMD ? '1440px' : '800px',
            maxHeight: 'calc(100vh - 64px)',
            margin: 'auto',
          }}
          width={100000}
          height={100000}
        />
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          position='absolute'
          top={0}
          bottom={0}
        >
          <img
            src='/assets/img/desktopLogo404.png'
            alt='/assets/img/desktopLogo404.png'
            {...size}
          />
          <Typography
            variant={isSM ? 'h4' : 'h5'}
            fontWeight='bold'
            color='#002967'
            align='center'
            m={2}
          >
            PÁGINA NO ENCONTRADA.
          </Typography>

          <Typography
            variant='body1'
            fontWeight='bold'
            color='#002967'
            maxWidth={isSM ? null : '300px'}
            align='center'
          >
            Lo sentimos, no pudimos encontrar la página que estás buscando.
          </Typography>
          <Typography
            variant={isSM ? 'h5' : 'body1'}
            fontWeight='bold'
            color='#002967'
            maxWidth='400px'
          >
            ¿La URL es correcta?
          </Typography>
          <Typography
            variant='body1'
            fontWeight='bold'
            color='#002967'
            maxWidth='400px'
            mb={2}
          >
            Asegúrese de revisar su ortografía.
          </Typography>
          <Button
            variant='contained'
            size='large'
            sx={{
              backgroundColor: '#002967',
              color: 'white',
              ':hover': { backgroundColor: '#002967' },
            }}
            onClick={() => navigate('/dashboard')}
          >
            inicio
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default PageNotFound
