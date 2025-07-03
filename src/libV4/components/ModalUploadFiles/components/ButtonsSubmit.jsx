import { SquareIconButton } from '@/lib'
import { Box } from '@mui/material'
import { useStoreActions } from 'easy-peasy'

const ButtonsSubmit = ({ activeStep, setActiveStep, closeModal, onSubmit }) => {
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const handleBack = () => {
    if (activeStep === 0) {
      setConfirmAlertProps({
        open: true,
        icon: 'warning',
        title: 'Cancelar',
        content: '¿Esta seguro que desea cancelar esta acción?',
        onConfirm: () => {
          closeModal()
        },
      })
      return
    }
    setActiveStep(activeStep - 1)
  }
  return (
    <Box
      my={2}
      display='flex'
      justifyContent={activeStep === 4 ? 'flex-end' : 'space-between'}
      gap={2}
    >
      {activeStep !== 4 && (
        <SquareIconButton
          color='secondary'
          text={activeStep === 0 ? 'Cancelar' : 'Anterior'}
          sx={{
            width: '10%',
          }}
          onClick={handleBack}
        />
      )}

      <SquareIconButton
        color='primary'
        text={activeStep === 4 ? 'Finalizar' : 'Siguiente'}
        sx={{
          width: '10%',
        }}
        onClick={onSubmit}
      />
    </Box>
  )
}

export default ButtonsSubmit
