import { useState } from 'react'
import InputsSection from './InputsSection'
import StepperSection from './StepperSection'
import { Grid } from '@mui/material'
import { BasicTitle } from '@/lib'

const ViewRegistry = ({ processTypes, processGroupsData }) => {
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
        <BasicTitle title={`Radicando proceso de ${processGroupsData?.data?.[0]?.name ?? ''}`} />
      </Grid>
      <StepperSection activeStep={activeStep} />
      <InputsSection
        processGroupsData={processGroupsData}
        processTypes={processTypes}
        setActiveStep={setActiveStep}
        activeStep={activeStep}
      />
    </Grid>
  )
}

export default ViewRegistry
