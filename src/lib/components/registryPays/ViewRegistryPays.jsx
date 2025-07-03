import { BackdropLoading, BasicTitle, ConfirmProcess } from '@/lib'
import { Box, Grid } from '@mui/material'
import { StepperRequirements } from '../../../app/inbox/components'
import { stepsLabels } from './constants'
import { FormSection } from './components'

const ViewRegistryPays = (props) => {
  return (
    <Box component='main'>
      <BackdropLoading loading={props.loadingCreateProcess ?? false} />
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
          steps={stepsLabels}
          step={props.activeStep}
        />
        {props?.activeStep === 0 && <FormSection {...props} />}
        {props?.activeStep === 1 && <ConfirmProcess infoProcess={props.infoProcess} />}
      </Grid>
    </Box>
  )
}

export default ViewRegistryPays
