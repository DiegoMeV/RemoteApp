import { Grid } from '@mui/material'
import { StepperHeader, StepperSection } from '.'

const StepperRequirements = ({ steps, step } = {}) => {
  return (
    <Grid
      item
      component='aside'
      xs={12}
      md={3}
    >
      <StepperHeader />
      <StepperSection
        step={step}
        steps={steps}
      />
    </Grid>
  )
}

export default StepperRequirements
