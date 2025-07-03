import {
  navigationBtnContainer,
  navigationContent,
} from '@/app/inbox/requirements/[idGroup]/styles'
import { Box, Button } from '@mui/material'
import { useStoreActions } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'

const FormButtons = () => {
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const navigate = useNavigate()
  const handleCancel = () => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Cancelar',
      content: '¿Esta seguro que desea cancelar la radicación?',
      onConfirm: () => {
        navigate(-1)
      },
    })
  }

  return (
    <Box sx={{ ...navigationBtnContainer, mt: '10px' }}>
      <Box sx={navigationContent}>
        <Button
          size='small'
          variant='contained'
          color='secondary'
          onClick={handleCancel}
        >
          cancelar
        </Button>
        <Button
          size='small'
          variant='contained'
          color='primary'
          type='small'
        >
          radicar
        </Button>
      </Box>
    </Box>
  )
}

export default FormButtons
