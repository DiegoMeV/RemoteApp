import { SquareIconButton } from '@/lib'
import { Box } from '@mui/material'
import { useStoreActions } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'

const ButtonsForm = ({ backPath, activeStep, setActiveStep, endStep, queueStatus, hideButton }) => {
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
        content: '¿Desea volver a la pagina principal?',
        onConfirm: () => {
          navigate(backPath)
        },
      })
      return
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      sx={{ marginTop: 'auto' }}
    >
      <SquareIconButton
        color='secondary'
        text={activeStep === 0 ? 'Cancelar' : 'Atrás'}
        sx={{
          width: '30%',
        }}
        size='middle'
        onClick={handleBack}
      />
      {hideButton !== activeStep && (
        <SquareIconButton
          type='submit'
          color='primary'
          disabled={queueStatus === 'QUEUED' || queueStatus === 'INPROGRESS'}
          text={activeStep === endStep ? 'Ver expedientes' : 'Siguiente'}
          sx={{
            width: '30%',
          }}
          size='middle'
        />
      )}
    </Box>
  )
}

export default ButtonsForm
