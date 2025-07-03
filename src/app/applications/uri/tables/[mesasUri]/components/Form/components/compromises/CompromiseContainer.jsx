import { Grid } from '@mui/material'

const CompromiseContainer = ({ children }) => {
  return (
    <Grid
      container
      p={2}
    >
      {children}
    </Grid>
  )
}

export default CompromiseContainer
