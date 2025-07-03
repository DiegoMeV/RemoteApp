import { Box, Divider, Grid } from '@mui/material'

const SummaryCard = ({ index, item }) => {
  return (
    <Box key={index}>
      <Grid
        container
        my={1.5}
      >
        <Grid
          item
          xs={5}
          md={3.2}
          lg={2.2}
        >
          {item.label}
        </Grid>
        <Grid
          item
          xs={5}
        >
          {item.value}
        </Grid>
      </Grid>
      <Divider />
    </Box>
  )
}

export default SummaryCard
