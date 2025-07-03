import { Box, Grid, Typography } from '@mui/material'
import { redirectContainer } from '../styles/styleSX'

const Redirect = () => {
  return (
    <Grid
      item
      xs={12}
    >
      <Box sx={redirectContainer}>
        <Typography align='center'>
          Redirigiendo a su servicio de Directorio Activo para validar el acceso...
        </Typography>
        <Typography
          color='primary'
          align='center'
        >
          Si después de 15 segundos no ha sido redirigido a su servicio de Directorio Activo, por
          favor, haga clic en el siguiente botón.
        </Typography>
      </Box>
    </Grid>
  )
}

export default Redirect
