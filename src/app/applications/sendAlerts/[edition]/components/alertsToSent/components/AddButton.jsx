import { Add } from '@mui/icons-material'
import { Button, Grid } from '@mui/material'

const AddButton = ({ modalAlerts }) => {
  return (
    <Grid
      item
      xs={12}
    >
      <Button
        variant='contained'
        onClick={modalAlerts?.handleShow}
        startIcon={<Add />}
      >
        Agregar alerta a enviar
      </Button>
    </Grid>
  )
}

export default AddButton
