import { Box, Grid, Typography } from '@mui/material'

const RenderOption = ({ props = {}, option = {} }) => {
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
          xs={4}
        >
          <Typography variant='body1'>{option?.hierarchy ?? ''}</Typography>
        </Grid>
        <Grid
          item
          xs={4}
        >
          <Typography variant='body1'>{option?.jobTitle ?? ''}</Typography>
        </Grid>
        <Grid
          item
          xs={4}
        >
          <Typography variant='body1'> {option?.depencyName ?? ''}</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default RenderOption
