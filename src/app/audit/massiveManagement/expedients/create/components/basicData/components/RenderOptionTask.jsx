import { Box, Grid, Typography } from '@mui/material'

const RenderOptionTask = ({ props = {}, option = {} }) => {
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
          <Typography variant='body1'>{option?.ParentTask?.name ?? ''}</Typography>
        </Grid>
        <Grid
          item
          xs={6}
        >
          <Typography variant='body1'>{option?.name ?? ''}</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default RenderOptionTask
