import { Box } from '@mui/material'
import { DynamicTableAlert, SearchTableWithRequest, TitleAlerts } from '../../components'
import { sxSearchTables } from '../../styles'
import { BackdropLoading, ErrorPage, NoAccessCard } from '@/lib'
import { AccessControl } from '@/libV4'

const ViewSendAlerts = ({
  searchSentAlerts,
  addNewModel,
  columns,
  sendAlerts,
  loadingSendAlerts,
  errorInfoSendAlerts,
}) => {
  return (
    <AccessControl
      privilege={'cgr.alertas.visualizar_envio_alertas'}
      nodeContent={<NoAccessCard />}
    >
      <TitleAlerts
        title='Envio de alertas'
        backpath='/applications'
      />
      <BackdropLoading loading={loadingSendAlerts} />
      <Box sx={sxSearchTables}>
        {errorInfoSendAlerts ? (
          <ErrorPage />
        ) : (
          <>
            <SearchTableWithRequest
              searchOptions={searchSentAlerts}
              buttonOptions={{
                add: addNewModel,
                label: 'Crear',
              }}
              privilege='cgr.alertas.crear_envio_alertas'
            />
            <DynamicTableAlert
              columns={columns ?? []}
              rows={sendAlerts?.data ?? []}
              loading={loadingSendAlerts}
            />
          </>
        )}
      </Box>
    </AccessControl>
  )
}

export default ViewSendAlerts
