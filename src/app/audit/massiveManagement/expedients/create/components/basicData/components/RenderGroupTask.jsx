import { Box, Grid, List, ListSubheader } from '@mui/material'

const RenderGroupTask = ({ params }) => {
  return (
    <Box key='header-options'>
      <List>
        <ListSubheader>
          <Grid container>
            <Grid
              item
              xs={6}
            >
              Etapa
            </Grid>
            <Grid
              item
              xs={6}
            >
              Actividad
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

export default RenderGroupTask
