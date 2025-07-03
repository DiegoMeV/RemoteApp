import { BasicTitle, NoAccessCard } from '@/lib'
import { Grid } from '@mui/material'
import { Form, StepperSection } from '../components'
import { AccessControl } from '@/libV4'

const ViewRegistryAri = ({ activeStep, setActiveStep, dataEditRegistry, idRegistry }) => {
  return (
    <AccessControl
      privilege={
        idRegistry === 'registryUri' ? 'cgr.uri.crear_registros' : 'cgr.uri.editar_registros'
      }
      nodeContent={<NoAccessCard />}
    >
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
            title={`Registro ARI`}
            backpath='/applications/uri/records'
          />
        </Grid>
        <StepperSection activeStep={activeStep} />
        <Form
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          dataEditRegistry={dataEditRegistry}
          idRegistry={idRegistry}
        />
      </Grid>
    </AccessControl>
  )
}

export default ViewRegistryAri
