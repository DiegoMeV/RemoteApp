import { Grid } from '@mui/material'
import { StepperHeader, StepperSection } from '.'

const StepperRequirements = ({ step }) => {
  const steps = [
    { label: 'Selección de proceso' },
    { label: 'Datos básicos' },
    { label: 'Activar proceso' },
  ]
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
      }}
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
