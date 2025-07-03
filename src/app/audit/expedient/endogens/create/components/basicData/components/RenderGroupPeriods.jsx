import { Box, Grid, List, ListSubheader } from '@mui/material'

const RenderGroupPeriods = ({ params }) => {
  return (
    <Box key='header-options'>
      <List>
        <ListSubheader>
          <Grid container>
            <Grid
              item
              xs={3}
            >
              Periodo
            </Grid>
            <Grid
              item
              xs={3}
            >
              SubPeriodo
            </Grid>
            <Grid
              item
              xs={3}
            >
              Cod Subperiodo
            </Grid>
            <Grid
              item
              xs={3}
            >
              Modulo
            </Grid>
          </Grid>
        </ListSubheader>
        {params?.children?.map?.((child, index) => (
          <li key={index}>{child}</li>
        ))}
      </List>
    </Box>
  )
}

export default RenderGroupPeriods
