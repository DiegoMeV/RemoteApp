import { Box, Stepper, Step, StepLabel, Grid } from '@mui/material'
import { containerStepperRegistry, stepperRegistry } from '../styles'
import { BasicTitle } from '@/lib'

const StepperRegistry = ({ activeStep, orientation }) => {
  const dataStepper = ['Datos básicos', 'Actualización del contrato', 'Actuaciones de financiero']
  return (
    <Box sx={containerStepperRegistry}>
      <Grid
        item
        xs={12}
      >
        <BasicTitle title='Radicación' />
      </Grid>
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
  )
}

export default StepperRegistry
