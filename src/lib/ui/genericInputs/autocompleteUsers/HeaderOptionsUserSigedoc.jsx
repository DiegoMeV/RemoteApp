import { Grid, List, ListSubheader } from '@mui/material'

const HeaderOptionsUserSigedoc = ({ params }) => {
  return (
    <List key={params.id}>
      <ListSubheader>
        <Grid container>
          <Grid
            item
            xs={6}
          >
            Nombre
          </Grid>
          <Grid
            item
            xs={6}
          >
            Correo
          </Grid>
        </Grid>
      </ListSubheader>
      <ul key={params.id}>{params.children}</ul>
    </List>
  )
}

export default HeaderOptionsUserSigedoc
