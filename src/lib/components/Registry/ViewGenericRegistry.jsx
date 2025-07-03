import { BasicTitle } from '@/lib/ui'
import { Box, Grid } from '@mui/material'
import { FormContainer, StepperRequirements } from './components'

const ViewGenericRegistry = (props) => {
  return (
    <Box component='main'>
      <BasicTitle
        title={`${props.title}`}
        backpath='/inbox'
      />
      <Grid
        container
        spacing={3}
        sx={{ p: 3 }}
      >
        <StepperRequirements
          steps={props.stepsLabels}
          step={props.activeStep}
        />
        <FormContainer {...props}>{props.children}</FormContainer>
      </Grid>
    </Box>
  )
}

export default ViewGenericRegistry
