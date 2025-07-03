import { Box, Button } from '@mui/material'

const OptionsForm = ({ handleCancel }) => {
  return (
    <Box
      width='100%'
      display='flex'
      justifyContent='flex-end'
      pt={2}
      columnGap={2}
    >
      <Button
        variant='contained'
        color='secondary'
        onClick={handleCancel}
      >
        Cancelar
      </Button>
      <Button
        variant='contained'
        type='submit'
      >
        Guardar
      </Button>
    </Box>
  )
}

export default OptionsForm
