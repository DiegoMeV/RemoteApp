import { Grid, useMediaQuery, useTheme } from '@mui/material'

const BrandSection = () => {
  const basePath = window.location.origin

  const companyImg =
    basePath.includes('servicio-oci') || !import.meta.env.VITE_COMPANY_IMAGE
      ? '/assets/svg/logo-soluciones-informacion.svg'
      : import.meta.env.VITE_COMPANY_IMAGE

  const theme = useTheme()
  const isMD = useMediaQuery(theme.breakpoints.up('md'))
  const isSM = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <Grid
      item
      md={7}
      xs={12}
      bgcolor='#D9D9D9'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <img
        src={companyImg || '/assets/svg/logo-soluciones-informacion.svg'}
        alt='Logo-Empresa'
        style={{
          maxWidth: isMD ? '500px' : isSM ? '250px' : '150px',
          height: 'auto',
        }}
      />
    </Grid>
  )
}

export default BrandSection
