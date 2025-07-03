import { Grid } from '@mui/material'

const ItemsContainer = ({ children }) => {
  return (
    <Grid
      item
      container
      spacing={1.25}
      xs={12}
      maxHeight='300px'
      overflow='auto'
      bgcolor={'backgroundGrey2'}
      borderRadius={2}
      sx={{ boxShadow: 1, my: 1, p: 2 }}
    >
      {children}
    </Grid>
  )
}

export default ItemsContainer
