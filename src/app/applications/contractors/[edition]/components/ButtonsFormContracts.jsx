import { useHandleCancelEditing } from '@/app/applications/hooks'
import { sxButtons } from '@/app/applications/styles'
import { Box, Button } from '@mui/material'
import toast from 'react-hot-toast'

const ButtonsFormContracts = ({ pathBack, handleClose }) => {
  const handleCancelEditing = useHandleCancelEditing({ path: pathBack, handleClose })

  return (
    <Box sx={sxButtons}>
      <Button
        color='error'
        variant='contained'
        onClick={
          handleCancelEditing ||
          (() => {
            toast.error('Error al cancelar la acción.')
          })
        }
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

export default ButtonsFormContracts
