import { SquareIconButton } from '@/lib'
import { Box } from '@mui/material'
import { useStoreActions } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'

const ButtonsSubmit = ({ finalStep, activeStep, setActiveStep }) => {
  const navigate = useNavigate()
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const handleBack = () => {
    if (activeStep === 0) {
      setConfirmAlertProps({
        open: true,
        icon: 'warning',
        title: 'Cancelar',
        content: '¿Esta seguro que desea cancelar la radicación?',
        onConfirm: () => {
          navigate('/inbox')
        },
      })
    } else {
      setActiveStep(activeStep - 1)
    }
  }
  return (
    <Box
      my={4}
      display='flex'
      justifyContent='space-between'
      gap={2}
    >
      <SquareIconButton
        color='secondary'
        text={activeStep === 0 ? 'Cancelar' : 'Regresar'}
        sx={{
          width: '10%',
        }}
        size='middle'
        onClick={handleBack}
      />
      <SquareIconButton
        type='submit'
        color='primary'
        text={finalStep === activeStep ? 'Finalizar' : 'Siguiente'}
        sx={{
          width: '10%',
        }}
        size='middle'
      />
    </Box>
  )
}

export default ButtonsSubmit
