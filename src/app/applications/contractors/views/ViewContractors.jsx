import { ErrorPage } from '@/lib'
import { DynamicTableAlert, SearchTableWithRequest, TitleAlerts } from '../../components'
import { Box } from '@mui/material'
import { sxSearchTables } from '../../styles'

const ViewContractors = ({
  isError,
  searchContractor,
  addContractor,
  columnsContractors,
  rowsApi,
  LoadingRowsApi,
}) => {
  return (
    <>
      <TitleAlerts
        title='Listado de contratistas'
        backpath='/applications'
      />
      {isError ? (
        <ErrorPage />
      ) : (
        <Box sx={sxSearchTables}>
          <SearchTableWithRequest
            searchOptions={searchContractor}
            buttonOptions={{
              add: addContractor,
              label: 'Crear',
            }}
            privilege='cgr.alertas.crear_contratistas'
          />
          <DynamicTableAlert
            columns={columnsContractors}
            rows={rowsApi}
            loading={LoadingRowsApi}
          />
        </Box>
      )}
    </>
  )
}

export default ViewContractors
