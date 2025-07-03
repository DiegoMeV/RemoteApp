import { Grid } from '@mui/material'
import { StepperRegistry } from '../components'

const StepperSection = ({ activeStep }) => {
  return (
    <Grid
      item
      component='aside'
      xs={12}
      md={3}
      sx={{
        pt: 1,
        pl: { xs: 1.5, md: 5 },
        pr: 1.5,
        height: 'auto',
      }}
    >
      <StepperRegistry
        activeStep={activeStep}
        orientation='vertical'
      />
    </Grid>
  )
}

export default StepperSection
