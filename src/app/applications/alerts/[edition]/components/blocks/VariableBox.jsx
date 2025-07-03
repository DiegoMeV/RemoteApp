import { Grid } from '@mui/material'

const VariableBox = ({ children }) => (
  <Grid
    item
    md={3.9}
    display='flex'
    justifyContent='center'
    alignItems='center'
    p={1}
  >
    {children}
  </Grid>
)

export default VariableBox
