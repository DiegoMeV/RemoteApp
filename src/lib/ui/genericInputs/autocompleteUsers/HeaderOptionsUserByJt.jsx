import { Grid, List, ListSubheader } from '@mui/material'

const HeaderOptionsUserByJt = ({ params }) => {
  return (
    <List key={params.id}>
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
      <ul key={params.id}>{params.children}</ul>
    </List>
  )
}

export default HeaderOptionsUserByJt
