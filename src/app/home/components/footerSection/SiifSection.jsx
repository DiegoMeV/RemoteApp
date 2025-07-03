import { Box, Grid, Typography } from '@mui/material'

const SiifSection = () => {
  const footerComponents = [
    {
      component: (
        <Typography
          variant='h5'
          color='white'
        >
          © 2024 Soluciones de Información
        </Typography>
      ),
    },
    {
      component: (
        <img
          src='/assets/svg/logoSiifWebWithText.svg'
          alt='Logo SiifWeb'
          width={163}
          height={42}
        />
      ),
    },
    {
      component: (
        <img
          src='/assets/img/logoGOV.png'
          alt='Logo GOV'
          width={198}
          height={60}
        />
      ),
    },
  ]
  return (
    <Box
      bgcolor='primary.main'
      borderRadius={2}
      p={2}
    >
      <Grid
        container
        spacing={2}
      >
        {footerComponents?.map((item, index) => {
          return (
            <Grid
              item
              xs={12}
              sm={4}
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {item.component}
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default SiifSection
