import { CustomTextField } from '@/lib'
import { Box, Button } from '@mui/material'
import { positionItemInput } from '../../constants'

const ButtonsOpenModal = ({ control, modalEvCode, modalParams }) => {
  return (
    <Box
      display='flex'
      justifyContent='flex-center'
      mb='10px'
      maxHeight='50px'
      gap='10px'
    >
      <CustomTextField
        item={{ ...positionItemInput, sx: { width: '100px' } }}
        control={control}
      />
      <Button
        variant='contained'
        onClick={modalEvCode?.handleShow}
      >
        Definir evento
      </Button>
      <Button
        variant='contained'
        onClick={modalParams?.handleShow}
      >
        Definir parametros
      </Button>
    </Box>
  )
}

export default ButtonsOpenModal
