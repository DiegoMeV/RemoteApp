import { Grid, Hidden } from '@mui/material'
import StepperRegistry from './StepperRegistry'

const StepperSection = ({ activeStep }) => {
  return (
    <Grid
      item
      xs={12}
      md={3}
      display='flex'
      flexDirection='column'
      overflow='auto'
      marginBottom='20px'
    >
      <Hidden mdUp>
        <StepperRegistry
          activeStep={activeStep}
          orientation='horizontal'
        />
      </Hidden>
      <Hidden mdDown>
        <StepperRegistry
          activeStep={activeStep}
          orientation='vertical'
        />
      </Hidden>
    </Grid>
  )
}

export default StepperSection
