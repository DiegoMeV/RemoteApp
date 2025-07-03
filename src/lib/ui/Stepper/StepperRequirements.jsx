import { Grid } from '@mui/material'
import { StepperHeader, StepperSection } from '.'

const StepperRequirements = ({ steps, step, stepperContentProps, headerTitle, sxStepper } = {}) => {
  return (
    <Grid
      item
      component='aside'
      xs={12}
    >
      {headerTitle && <StepperHeader />}
      <StepperSection
        step={step}
        steps={steps}
        stepperContentProps={stepperContentProps}
        sxStepper={sxStepper}
      />
    </Grid>
  )
}

export default StepperRequirements
