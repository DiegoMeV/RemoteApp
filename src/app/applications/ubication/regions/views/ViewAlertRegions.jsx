import { Box } from '@mui/material'

import { ErrorPage } from '@/lib'

import {
  DynamicTableAlert,
  SearchTableWithRequest,
  TitleAlerts,
} from '@/app/applications/components'
import { sxSearchTables } from '@/app/applications/styles'

const ViewAlertRegions = ({ loadingRows, isError, columns, rows, addRegion, searchRegion }) => {
  return (
    <>
      {isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title='Listado Regiones'
            backpath='/applications'
          />
          <Box sx={sxSearchTables}>
            <SearchTableWithRequest
              searchOptions={searchRegion}
              buttonOptions={{
                add: addRegion,
                label: 'Crear',
              }}
              privilege='cgr.alertas.crear_regiones'
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

export default ViewAlertRegions
