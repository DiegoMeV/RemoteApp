import { FactCheckOutlined } from '@mui/icons-material'
import { Box, Button, Grid } from '@mui/material'

const SaveButton = () => {
  return (
    <Grid
      item
      xs={12}
      component={Box}
      display='flex'
      justifyContent='flex-end'
    >
      <Button
        variant='contained'
        endIcon={<FactCheckOutlined />}
        type='submit'
      >
        Guardar
      </Button>
    </Grid>
  )
}

export default SaveButton
