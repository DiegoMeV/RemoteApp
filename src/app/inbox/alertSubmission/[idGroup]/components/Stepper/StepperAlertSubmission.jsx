/*
TODO: 
    Volver a componente generico StepperHeader, StepperSection y StepperAlertSubmission,
    ya que lo unico en que varia es el arreglo de los pasos
*/
import { StepperHeader, StepperSection } from '@/app/inbox/requirements/[idGroup]/components'
import { Grid } from '@mui/material'

const StepperAlertSubmission = ({ step }) => {
  const steps = [
    { label: 'Selección de proceso' },
    { label: 'Alertas' },
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

export default StepperAlertSubmission
