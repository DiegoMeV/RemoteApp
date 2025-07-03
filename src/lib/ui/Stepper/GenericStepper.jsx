import { Box, Step, Stepper } from '@mui/material'
import {
  ColorlibConnector,
  genericStepperContainerStyles,
  StepperContentStyleContainer,
} from '../Stepper/styles'
import StepItem from './StepItem'

const GenericStepper = ({ steps, activeStep, sxStepper }) => {
  // TO-DO: setActiveStep

  const handleClick = () => {
    // TO-DO: index
    // setActiveStep(index + 1)
  }
  return (
    <Box sx={genericStepperContainerStyles}>
      <Stepper
        activeStep={activeStep}
        orientation={'horizontal'}
        sx={{
          ...StepperContentStyleContainer,
          ...sxStepper,
          '& .MuiStep-root': {
            paddingLeft: 2,
            paddingRight: 2,
          },
        }}
        alternativeLabel
        connector={<ColorlibConnector />}
      >
        {steps.map((step, index) => {
          const colorActiveStep =
            activeStep === index || activeStep > index ? 'primary' : 'secondary'
          return (
            <Step
              key={index}
              onClick={() => handleClick(index)}
            >
              <StepItem
                step={step}
                colorActiveStep={colorActiveStep}
              />
            </Step>
          )
        })}
      </Stepper>
    </Box>
  )
}

export default GenericStepper
