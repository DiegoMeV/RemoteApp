import { Box, Grid, List, ListSubheader } from '@mui/material'

const RenderGroup = ({ params }) => {
  return (
    <Box key='header-options'>
      <List>
        <ListSubheader>
          <Grid container>
            <Grid
              item
              xs={4}
            >
              Nombre
            </Grid>
            <Grid
              item
              xs={4}
            >
              Cargo
            </Grid>
            <Grid
              item
              xs={4}
            >
              Dependencia
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

export default RenderGroup
