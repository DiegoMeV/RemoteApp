import { Box } from '@mui/material'
import { StepperSectionStyleContainer } from './styles'
import { StepperContent } from '.'

const StepperSection = ({ step, steps, stepperContentProps, sxStepper } = {}) => {
  return (
    <Box
      component='section'
      sx={StepperSectionStyleContainer}
    >
      <StepperContent
        step={step}
        orientation='vertical'
        steps={steps}
        sxStepper={sxStepper}
        {...stepperContentProps}
      />
    </Box>
  )
}

export default StepperSection
