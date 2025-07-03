import { Box, Button, Grid } from '@mui/material'
import { boxOneButtonsSelects, gridOneButtonsSelects } from '../styles'

const ButtonsSelects = ({ toggleDepartamentos, departamentos, toggleMarker, viewMarkers }) => {
  return (
    <Grid
      item
      xs={12}
      sx={gridOneButtonsSelects}
    >
      <Box sx={boxOneButtonsSelects}>
        <Button
          variant='contained'
          color={departamentos ? 'primary' : 'secondary'}
          onClick={toggleDepartamentos}
        >
          Mostrar Departamentos
        </Button>
        <Button
          variant='contained'
          color={viewMarkers ? 'primary' : 'secondary'}
          onClick={toggleMarker}
        >
          Mostrar puntos
        </Button>
      </Box>
    </Grid>
  )
}

export default ButtonsSelects
