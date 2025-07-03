import { Box, Button, Grid } from '@mui/material'
import { ActuacionesFuncionario, ActualizacionContrato, InformacionPersonal } from '../components'

const ViewForm = ({ form, onSubmit, activeStep, setActiveStep, isPending }) => {
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
      {activeStep === 0 && <InformacionPersonal form={form} />}
      {activeStep === 1 && <ActualizacionContrato form={form} />}
      {activeStep === 2 && <ActuacionesFuncionario form={form} />}

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
            onClick={() => setActiveStep(activeStep - 1)}
          >
            regresar
          </Button>
        )}
        {activeStep !== 2 && (
          <Button
            variant='contained'
            color='primary'
            type='button'
            onClick={() => setActiveStep(activeStep + 1)}
          >
            Siguiente
          </Button>
        )}
        {activeStep === 2 && (
          <Button
            variant='contained'
            color='primary'
            disabled={isPending}
            type='submit'
          >
            Enviar
          </Button>
        )}
      </Box>
    </Grid>
  )
}

export default ViewForm
