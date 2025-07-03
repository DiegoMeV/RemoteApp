import { Box, Stepper, Typography, Step, StepLabel } from '@mui/material'
import {
  containerStepperContent,
  containerStepperRegistry,
  containerStepperTitle,
  stepperRegistry,
} from '../styles'

const StepperRegistry = ({ activeStep, orientation }) => {
  const dataStepper = ['Selección de proceso', 'Datos básicos', 'Resumen']
  return (
    <Box sx={containerStepperRegistry}>
      <Box sx={containerStepperTitle}>
        <Typography
          variant='h5'
          color='primary'
        >
          Radicación
        </Typography>
      </Box>
      <Box sx={containerStepperContent}>
        <Stepper
          activeStep={activeStep}
          orientation={orientation}
          sx={stepperRegistry}
        >
          {dataStepper.map((step, index) => {
            return (
              <Step key={index}>
                <StepLabel>{step}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </Box>
    </Box>
  )
}

export default StepperRegistry
