import { Box } from '@mui/material'
import { StepperContent } from '.'
import { StepperSectionStyleContainer } from '../styles'

const StepperSection = ({ step, steps } = {}) => {
  return (
    <Box
      component='section'
      sx={StepperSectionStyleContainer}
    >
      <StepperContent
        step={step}
        orientation='vertical'
        steps={steps}
      />
    </Box>
  )
}

export default StepperSection
