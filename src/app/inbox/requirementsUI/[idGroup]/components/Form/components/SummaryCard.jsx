import { Divider, Grid } from '@mui/material'
import { Box } from '@mui/system'

const SummaryCard = ({ index, item }) => {
  return (
    <Box key={index}>
      <Grid
        container
        my={1.5}
      >
        <Grid
          item
          xs={6}
        >
          {item.label}
        </Grid>
        <Grid
          item
          xs={6}
        >
          {item.value}
        </Grid>
      </Grid>
      <Divider />
    </Box>
  )
}

export default SummaryCard
