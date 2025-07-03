import { Box, Grid, Typography } from '@mui/material'

const RenderOptionPeriods = ({ props = {}, option = {} }) => {
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
          xs={3}
        >
          <Typography variant='body1'>{option?.periodo ?? ''}</Typography>
        </Grid>
        <Grid
          item
          xs={3}
        >
          <Typography variant='body1'>{option?.subperiodo ?? ''}</Typography>
        </Grid>
        <Grid
          item
          xs={3}
        >
          <Typography variant='body1'> {option?.codSubperiodo ?? ''}</Typography>
        </Grid>
        <Grid
          item
          xs={3}
        >
          <Typography variant='body1'> {option?.modulo} </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default RenderOptionPeriods
