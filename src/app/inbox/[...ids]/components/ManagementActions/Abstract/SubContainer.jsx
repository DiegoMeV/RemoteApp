import { Grid } from '@mui/material'

const SubContainer = ({ lg, children }) => {
  return (
    <Grid
      item
      xs={12}
      lg={lg}
    >
      <Grid
        container
        px={1}
        columnSpacing={2}
      >
        {children}
      </Grid>
    </Grid>
  )
}

export default SubContainer
