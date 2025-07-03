import { Box, Grid, List, ListSubheader } from '@mui/material'

const RenderGroupBills = ({ params }) => {
  return (
    <Box key='header-options'>
      <List>
        <ListSubheader>
          <Grid container>
            <Grid
              item
              xs={6}
            >
              Proceso Liquidación Oficial
            </Grid>
            <Grid
              item
              xs={6}
            >
              Cantidad respectivamente
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

export default RenderGroupBills
