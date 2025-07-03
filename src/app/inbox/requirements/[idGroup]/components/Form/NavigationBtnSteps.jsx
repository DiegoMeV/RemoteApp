import { Box, Button } from '@mui/material'
import { useStoreActions } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import { navigationBtnContainer, navigationCancel, navigationContent } from '../../styles'

const NavigationBtnSteps = ({
  currentStep,
  setStep,
  handleBackComplement = (func) => {
    func()
  },
  updateActivity = () => {},
}) => {
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
        navigate('/inbox')
      },
    })
  }

  const handleBack = () => {
    // TODO: Esta debe estar mas completa, con un alert
    setStep((prev) => prev - 1)
  }

  return (
    <Box sx={navigationBtnContainer}>
      <Box sx={navigationContent}>
        <Button
          variant='contained'
          size='small'
          color='secondary'
          sx={navigationCancel}
          onClick={handleCancel}
        >
          cancelar
        </Button>
        {currentStep >= 1 && (
          <Button
            variant='contained'
            size='small'
            color='error'
            onClick={() => {
              handleBackComplement(handleBack)
            }}
          >
            regresar
          </Button>
        )}
        <Button
          variant='contained'
          size='small'
          color='primary'
          type='submit'
          onClick={() => {
            if (currentStep === 2) {
              updateActivity({
                body: {
                  status: 'COMPLETED',
                },
              })
            }
          }}
        >
          {currentStep === 3 ? 'finalizar' : 'siguiente'}
        </Button>
      </Box>
    </Box>
  )
}

export default NavigationBtnSteps
