import { TitleAlerts } from '@/app/applications/components'
import { AlertsToSent, BasicInfoSendAlerts } from '../components'
import { sxContainer } from '@/app/applications/styles'
import { Box, Button, Typography } from '@mui/material'
import { BackdropLoading, NoAccessCard } from '@/lib'
import { AccessControl } from '@/libV4'

const ViewEditSentAlerts = ({
  idEdition,
  handleSubmit,
  onSubmit,
  navigate,
  control,
  setValue,
  loadingUpdateSent,
  idModelo,
}) => {
  return (
    <AccessControl
      privilege={
        idEdition === 'new' ? 'cgr.alertas.crear_envio_alertas' : 'cgr.alertas.editar_envio_alertas'
      }
      nodeContent={<NoAccessCard />}
    >
      <BackdropLoading loading={loadingUpdateSent} />
      <TitleAlerts
        title={idEdition === 'new' ? 'Creación de envio de alerta' : 'Edición de envio de alerta'}
        backpath='/applications/sendAlerts'
      />
      <Box
        sx={sxContainer}
        component='form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <BasicInfoSendAlerts
          control={control}
          setValue={setValue}
          idEdition={idEdition}
        />
        {idEdition !== 'new' ? (
          <AlertsToSent
            idEdition={idEdition}
            idModelo={idModelo}
          />
        ) : (
          <Typography>Para asociar las alertas debe crear primero el envío </Typography>
        )}

        <Box
          display='flex'
          justifyContent='flex-end'
          padding='20px'
          gap='10px'
        >
          <Button
            type='button'
            variant='contained'
            color='secondary'
            onClickCancel={() => navigate(`/applications/models`)}
          >
            Cancelar
          </Button>
          <Button
            type='submit'
            variant='contained'
            color='primary'
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </AccessControl>
  )
}

export default ViewEditSentAlerts
