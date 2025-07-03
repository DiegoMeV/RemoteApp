import { Step, StepLabel, Stepper } from '@mui/material'
import { StepperContentStyleContainer } from './styles'
import CustomStepIcon from './CustomStepIcon'

const StepperContent = ({ step, orientation, steps, sxStepper, icons } = {}) => {
  return (
    <Stepper
      activeStep={step}
      orientation={orientation ?? 'horizontal'}
      sx={{
        ...StepperContentStyleContainer,
        ...sxStepper,
      }}
      alternativeLabel
    >
      {steps.map((step, index) => {
        return (
          <Step key={index}>
            <StepLabel
              StepIconComponent={icons ? CustomStepIcon : undefined}
              StepIconProps={{
                icons,
              }}
              sx={{
                '& .MuiStepLabel-label.Mui-active': {
                  color: 'primary.main',
                  fontWeight: 'bold',
                },
                '& .MuiStepLabel-label.Mui-completed': {
                  color: 'primary.main',
                  fontWeight: 'bold',
                },
              }}
            >
              {step}
            </StepLabel>
          </Step>
        )
      })}
    </Stepper>
  )
}

export default StepperContent
