import { ErrorPage } from '@/lib'
import { DynamicTableAlert, SearchTableWithRequest, TitleAlerts } from '../../components'
import { sxSearchTables } from '../../styles'
import { Box } from '@mui/material'

const ViewActingTypes = ({
  actingTypes,
  isLoading,
  isError,
  addActingTypes,
  columns,
  searchActingType,
}) => {
  return (
    <>
      {isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title='Lista de tipos de actuación'
            backpath='/applications'
          />
          <Box sx={sxSearchTables}>
            <SearchTableWithRequest
              searchOptions={searchActingType}
              buttonOptions={{
                add: addActingTypes,
                label: 'Crear',
              }}
              privilege={'cgr.alertas.crear_tipos_actuacion'}
            />
            <DynamicTableAlert
              columns={columns ?? []}
              rows={actingTypes?.data ?? []}
              loading={isLoading}
            />
          </Box>
        </>
      )}
    </>
  )
}

export default ViewActingTypes
