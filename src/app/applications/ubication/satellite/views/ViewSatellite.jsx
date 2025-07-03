import {
  DynamicTableAlert,
  SearchTableWithRequest,
  TitleAlerts,
} from '@/app/applications/components'
import { sxSearchTables } from '@/app/applications/styles'
import { ErrorPage } from '@/lib'
import { Box } from '@mui/material'

const ViewSatellite = ({ loadingRows, isError, columns, rows, addSatellite, searchSatellite }) => {
  return (
    <>
      {isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title='Listado de Satelitales'
            backpath='/applications'
          />
          <Box sx={sxSearchTables}>
            <SearchTableWithRequest
              searchOptions={searchSatellite}
              buttonOptions={{
                add: addSatellite,
                label: 'Crear',
              }}
              privilege='cgr.alertas.crear_satelite'
            />
            <DynamicTableAlert
              columns={columns ?? []}
              rows={rows?.data ?? []}
              loading={loadingRows}
            />
          </Box>
        </>
      )}
    </>
  )
}

export default ViewSatellite
