import { BasicTitle } from '@/lib'
import { Grid } from '@mui/material'
import { Form, StepperSection } from '../components'

const ViewCompromiseUri = ({ activeStep, setActiveStep, idCompromise, dataEditCompromisee }) => {
  return (
    <Grid
      container
      maxWidth='1200px'
      m='0 auto'
      pt={3}
    >
      <Grid
        item
        xs={12}
      >
        <BasicTitle
          title={`Registro de compromisos`}
          backpath='/applications/uri/compromise'
        />
      </Grid>
      <StepperSection activeStep={activeStep} />
      <Form
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        dataEditCompromisee={dataEditCompromisee}
        idCompromise={idCompromise}
      />
    </Grid>
  )
}

export default ViewCompromiseUri
