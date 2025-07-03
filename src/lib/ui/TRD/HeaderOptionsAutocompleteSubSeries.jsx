import { Grid, List, ListSubheader } from '@mui/material'

const HeaderOptionsAutocompleteSubSeries = ({ params }) => {
  return (
    <List key={params.id}>
      <ListSubheader>
        <Grid container>
          <Grid
            item
            xs={3}
          >
            Número
          </Grid>
          <Grid
            item
            xs={5}
          >
            Nombre
          </Grid>

          <Grid
            item
            xs={4}
          >
            Dependencia
          </Grid>
        </Grid>
      </ListSubheader>
      <ul key={params.id}>{params.children}</ul>
    </List>
  )
}

export default HeaderOptionsAutocompleteSubSeries
