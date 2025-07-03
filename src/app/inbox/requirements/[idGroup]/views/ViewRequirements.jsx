import { Grid } from '@mui/material'
import { useState } from 'react'
import { FormRequirements, StepperRequirements } from '../components'
import { BasicTitle } from '@/lib'

const ViewRequirements = ({ processTypes, infoGroup }) => {
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
        <BasicTitle title={`Radicando proceso de ${infoGroup?.name ?? ''}`} />
      </Grid>
      <StepperRequirements step={activeStep} />
      <FormRequirements
        processTypes={processTypes}
        step={activeStep}
        setActiveStep={setActiveStep}
        infoGroup={infoGroup}
      />
    </Grid>
  )
}

export default ViewRequirements
