import { ErrorPage } from '@/lib'
import { DynamicTableAlert, SearchTableWithRequest, TitleAlerts } from '../../components'
import { Box } from '@mui/material'
import { sxSearchTables } from '../../styles'

const ViewResultTypes = ({
  resultTypesInfo,
  isLoading,
  isError,
  addResultTypes,
  columns,
  searchResultType,
}) => {
  return (
    <>
      {isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title='Lista de tipos de resultado'
            backpath='/applications'
          />
          <Box sx={sxSearchTables}>
            <SearchTableWithRequest
              searchOptions={searchResultType}
              buttonOptions={{
                add: addResultTypes,
                label: 'Crear',
              }}
              privilege={'cgr.alertas.crear_tipos_resultado'}
            />
            <DynamicTableAlert
              columns={columns ?? []}
              rows={resultTypesInfo?.data ?? []}
              loading={isLoading}
            />
          </Box>
        </>
      )}
    </>
  )
}

export default ViewResultTypes
