import { Box, Button, Grid } from '@mui/material'
import {
  Actuaciones,
  ActualizacionesContrato,
  AlertData,
  BasicData,
  CierreSeguimiento,
} from '../components'

const ViewForm = ({ form, onSubmit, activeStep, isPending, changeStep, requiredInput }) => {
  return (
    <Grid
      item
      component='form'
      onSubmit={form.handleSubmit(onSubmit)}
      display='flex'
      flexDirection='column'
      paddingInline={1}
      gap={5}
      xs={12}
      md={9}
      mt={'36px'}
    >
      {activeStep === 0 && (
        <BasicData
          form={form}
          requiredInput={requiredInput}
        />
      )}
      {activeStep === 1 && <AlertData form={form} />}
      {activeStep === 2 && <CierreSeguimiento form={form} />}
      {activeStep === 3 && <ActualizacionesContrato form={form} />}
      {activeStep === 4 && <Actuaciones form={form} />}

      <Box
        display='flex'
        gap={2}
        mr={2}
        justifyContent='flex-end'
      >
        {activeStep !== 0 && (
          <Button
            variant='contained'
            color='error'
            type='button'
            disabled={isPending}
            onClick={() => changeStep(activeStep - 1)}
          >
            regresar
          </Button>
        )}
        {activeStep < 2 && (
          <Button
            variant='contained'
            color='primary'
            type='button'
            onClick={() => changeStep(activeStep + 1)}
          >
            Siguiente
          </Button>
        )}
        {activeStep >= 2 && (
          <Button
            variant='contained'
            color='primary'
            disabled={isPending}
            type='submit'
          >
            {activeStep === 2 ? 'Enviar' : 'Terminar'}
          </Button>
        )}
      </Box>
    </Grid>
  )
}

export default ViewForm
