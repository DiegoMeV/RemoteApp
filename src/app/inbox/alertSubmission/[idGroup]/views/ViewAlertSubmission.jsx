import { BasicTitle } from '@/lib'
import { Grid } from '@mui/material'
import { useState } from 'react'
import { FormAlertSubmission, StepperAlertSubmission } from '../components'

const ViewAlertSubmission = ({
  currentGroup,
  idGroup,
  idProcess,
  processInfo,
  loadingProcessInfo,
  isEdition,
}) => {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <Grid
      container
      component='main'
      sx={{ pt: '1px', pb: '10px' }}
    >
      <Grid
        item
        xs={12}
      >
        <BasicTitle title={`Radicando proceso de ${currentGroup?.name ?? ''}`} />
      </Grid>
      <StepperAlertSubmission step={activeStep} />
      <FormAlertSubmission
        processTypes={currentGroup?.ProcessTypes ?? []}
        step={activeStep}
        setActiveStep={setActiveStep}
        idGroup={idGroup}
        idProcess={idProcess}
        processInfo={processInfo}
        loadingProcessInfo={loadingProcessInfo}
        isEdition={isEdition}
      />
    </Grid>
  )
}

export default ViewAlertSubmission
