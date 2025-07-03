import { Box, Button } from '@mui/material'
import { useButtonsForNavigation } from '../hooks'

const NavigationButtons = ({
  activeStep,
  setActiveStep,
  idSelected,
  setErrorInfo,
  infoProcess,
  basicDataProcess,
}) => {
  const isAnyRequiredFieldEmpty = basicDataProcess?.some(
    (field) => field.required === true && field.value === ''
  )
  const [handleCancel, handleBack, handleValidationNext] = useButtonsForNavigation({
    activeStep,
    setActiveStep,
    idSelected,
    setErrorInfo,
    infoProcess,
    basicDataProcess,
    isAnyRequiredFieldEmpty,
  })
  return (
    <Box
      display='flex'
      width='100%'
      gap={1}
      justifyContent='flex-end'
    >
      {activeStep !== 3 && (
        <>
          <Button
            variant='contained'
            color='secondary'
            disabled={activeStep > 3}
            onClick={handleCancel}
          >
            cancelar
          </Button>
          {activeStep !== 0 && (
            <Button
              variant='contained'
              color='error'
              disabled={activeStep > 3}
              onClick={handleBack}
            >
              regresar
            </Button>
          )}
          <Button
            variant='contained'
            color='primary'
            onClick={handleValidationNext}
          >
            {activeStep === 2 ? 'radicar' : 'siguiente'}
          </Button>
        </>
      )}
    </Box>
  )
}

export default NavigationButtons
