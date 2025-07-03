import { Grid, Typography } from '@mui/material'

const CustomOptionAutocompleteSubSeries = ({ option }) => {
  return (
    <Grid
      container
      borderBottom='1px solid #E7E7E7'
    >
      <Grid
        item
        xs={3}
      >
        <Typography variant='body1'>{option.numero}</Typography>
      </Grid>
      <Grid
        item
        xs={5}
      >
        <Typography variant='body1'>{option?.nombre}</Typography>
      </Grid>

      <Grid
        item
        xs={4}
      >
        <Typography variant='body1'> {option?.dependenciaInfo?.name}</Typography>
      </Grid>
    </Grid>
  )
}

export default CustomOptionAutocompleteSubSeries
