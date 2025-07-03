import { SquareIconButton } from '@/lib'
import { Box } from '@mui/material'
import { useStoreActions } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'

const ButtonsSubmit = () => {
  const navigate = useNavigate()
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const handleBack = () => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Cancelar',
      content: '¿Esta seguro que desea cancelar la radicación?',
      onConfirm: () => {
        navigate('/index')
      },
    })
  }
  return (
    <Box
      my={4}
      display='flex'
      justifyContent='flex-end'
      gap={2}
    >
      <SquareIconButton
        color='secondary'
        text='Cancelar'
        sx={{
          width: '10%',
        }}
        size='middle'
        onClick={handleBack}
      />
      <SquareIconButton
        type='submit'
        color='primary'
        text='Finalizar'
        sx={{
          width: '10%',
        }}
        size='middle'
      />
    </Box>
  )
}

export default ButtonsSubmit
