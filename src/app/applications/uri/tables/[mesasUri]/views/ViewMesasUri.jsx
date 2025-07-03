import { BasicTitle, NoAccessCard } from '@/lib'
import { Grid } from '@mui/material'
import { Form, StepperSection } from '../components'
import { AccessControl } from '@/libV4'

const ViewMesasUri = ({ activeStep, setActiveStep, idTable, dataEditTable }) => {
  return (
    <AccessControl
      privilege={idTable === 'mesasUri' ? 'cgr.uri.crear_mesas' : 'cgr.uri.editar_mesas'}
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
            title={`Registro Mesas`}
            backpath='/applications/uri/tables'
          />
        </Grid>
        <StepperSection activeStep={activeStep} />
        <Form
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          dataEditTable={dataEditTable}
          idTable={idTable}
        />
      </Grid>
    </AccessControl>
  )
}

export default ViewMesasUri
