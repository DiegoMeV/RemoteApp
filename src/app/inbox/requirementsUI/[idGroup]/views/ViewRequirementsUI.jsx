import { Grid } from '@mui/material'
import { useState } from 'react'
import { FormRequirements, StepperRequirementsUI } from '../components'
import { BasicTitle } from '@/lib'

const ViewRequirementsUI = ({ processTypes, infoGroup, idProcessParent, idParentActivity }) => {
  const [activeStep, setActiveStep] = useState(0)

  //TODO: Toda esta vista debe ser generica
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
        <BasicTitle title={`Radicando proceso de ${infoGroup?.name ?? ''}`} />
      </Grid>
      <StepperRequirementsUI
        step={activeStep}
        idProcessParent={idProcessParent}
        idParentActivity={idParentActivity}
      />
      <FormRequirements
        processTypes={processTypes}
        step={activeStep}
        setActiveStep={setActiveStep}
        idProcessParent={idProcessParent}
        idParentActivity={idParentActivity}
      />
    </Grid>
  )
}

export default ViewRequirementsUI
