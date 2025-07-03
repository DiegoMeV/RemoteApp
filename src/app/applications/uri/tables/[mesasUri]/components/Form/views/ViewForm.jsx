import { Box, Button, Grid } from '@mui/material'

import { useStoreActions } from 'easy-peasy'
import { InformacionPersonal } from '../components/InformacionPersonal'
import { DatosDeContrato } from '../components/DatosDeContrato'
import { ActuacionesProceso } from '../components/ActuacionesProceso'
import { Compromises } from '../components/compromises'
import { useQueryDynamicApi } from '@/lib'

const ViewForm = ({
  form,
  onSubmit,
  activeStep,
  changeStep,
  isPending,
  idTable,
  idMesa,
  errors,
  isError,
  requiredInput,
  setValue,
  watch,
  isTotallyApp,
}) => {
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const mesasAriId = idTable === 'mesasUri' ? idMesa : idTable
  const handleSaveClick = () => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Activar',
      content: '¿Esta seguro que desea enviar este formulario?',
      onConfirm: async () => {
        if (!isError) {
          await changeStep(activeStep + 1)
          form.handleSubmit(onSubmit)()
        }
      },
    })
  }

  const idRegistroAri = form.getValues()?.id_registro_ari

  const { data: dataRegistryAri } = useQueryDynamicApi({
    url: `/registroAri/${idRegistroAri?.id}/registroMesa`,
    baseKey: 'urlCgr',
    isCompanyRequest: true,
    enabled: !!idRegistroAri?.id,
  })

  return (
    <Grid
      item
      component='form'
      onSubmit={(e) => e.preventDefault()}
      display='flex'
      flexDirection='column'
      paddingInline={1}
      gap={5}
      xs={12}
      md={9}
      mt={'36px'}
    >
      {activeStep === 0 && (
        <InformacionPersonal
          form={form}
          errors={errors}
          setValue={setValue}
          watch={watch}
        />
      )}
      {activeStep === 1 && (
        <DatosDeContrato
          form={form}
          errors={errors}
          dataRegistryAri={dataRegistryAri?.data[0]}
        />
      )}
      {activeStep === 2 && (
        <ActuacionesProceso
          dataRegistryAri={dataRegistryAri?.data[0]}
          form={form}
          errors={errors}
        />
      )}
      {activeStep === 3 && (
        <Compromises
          mesasAriId={mesasAriId}
          isTotallyApp={isTotallyApp}
        />
      )}

      <Box
        display='flex'
        gap={2}
        mr={2}
        justifyContent='flex-end'
      >
        {activeStep !== 0 && activeStep !== 3 && (
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
        {activeStep !== 2 && activeStep !== 3 && (
          <Button
            variant='contained'
            color='primary'
            type='button'
            onClick={() => changeStep(activeStep + 1)}
          >
            Siguiente
          </Button>
        )}
        {activeStep === 2 && (
          <Button
            variant='contained'
            color='primary'
            disabled={isPending || requiredInput}
            type='submit'
            onClick={() => handleSaveClick()}
          >
            Enviar
          </Button>
        )}
      </Box>
    </Grid>
  )
}

export default ViewForm
