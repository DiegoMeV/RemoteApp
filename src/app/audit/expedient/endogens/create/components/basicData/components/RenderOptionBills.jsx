import { Box, Grid, Typography } from '@mui/material'

const RenderOptionBills = ({ props = {}, option = {} }) => {
  return (
    <Box
      {...props}
      key={option.id}
    >
      <Grid
        container
        borderBottom='1px solid #E7E7E7'
      >
        <Grid
          item
          xs={6}
        >
          <Typography variant='body1'>{option?.facturacion ?? ''}</Typography>
        </Grid>
        <Grid
          item
          xs={6}
        >
          <Typography variant='body1'>{option?.cantidadAforos ?? ''}</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default RenderOptionBills
