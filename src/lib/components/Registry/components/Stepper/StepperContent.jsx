import { Step, StepLabel, Stepper } from '@mui/material'
import { StepperContentStyleContainer } from './StepperStyles'

const StepperContent = ({ step, orientation, steps } = {}) => {
  return (
    <Stepper
      activeStep={step}
      orientation={orientation}
      sx={StepperContentStyleContainer}
    >
      {steps.map((step, index) => {
        return (
          <Step key={index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        )
      })}
    </Stepper>
  )
}

export default StepperContent
