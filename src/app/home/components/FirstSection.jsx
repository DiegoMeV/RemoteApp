import { useTheme } from '@emotion/react'
import { Grid, Typography, useMediaQuery } from '@mui/material'

const FirstSection = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <div
      style={{
        padding: '20px 30px',
      }}
    >
      <Grid
        container
        alignItems='center'
      >
        <Grid
          item
          xs={3}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src='/assets/svg/logMinTic.svg'
            alt='Agencia Nacional Digital Logo'
            width={isSmallScreen ? 35 : 69}
            height={isSmallScreen ? 62 : 124}
          />
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src='/assets/svg/logoAND.svg'
            alt='Agencia Nacional Digital Logo'
            width={isSmallScreen ? 84 : 168}
            height={isSmallScreen ? 62 : 125}
          />
        </Grid>
        <Grid
          item
          xs={6}
        >
          <Typography
            color='primary'
            sx={{
              textAlign: {
                xs: 'center',
                md: 'right',
              },
              fontSize: {
                xs: 18,
                sm: 24,
                md: 46,
              },
              textShadow: '2px 2px 2px rgba(0, 0, 0, 0.5)',
            }}
          >
            Cultura Digital al Servicio de los Colombianos
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default FirstSection
