import { ErrorPage } from '@/lib'
import { DynamicTableAlert, SearchTableWithRequest, TitleAlerts } from '../../components'
import { Box } from '@mui/material'
import { sxSearchTables } from '../../styles'

const ViewForAlerts = ({ isError, isLoading, columns, alerts, searchAlert }) => {
  return (
    <>
      <TitleAlerts
        title='Listado de alertas'
      />
      {isError ? (
        <ErrorPage />
      ) : (
        <Box sx={sxSearchTables}>
          <SearchTableWithRequest
            searchOptions={searchAlert}
            privilege='cgr.alertas.crear_alertas'
          />
          <DynamicTableAlert
            loading={isLoading}
            columns={columns}
            rows={alerts?.data || []}
          />
        </Box>
      )}
    </>
  )
}

export default ViewForAlerts
