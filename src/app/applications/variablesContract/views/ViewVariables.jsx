import { DynamicTableAlert, SearchTableWithRequest, TitleAlerts } from '../../components'
import { ErrorPage } from '@/lib'
import { Box } from '@mui/material'
import { sxSearchTables } from '../../styles'

const ViewVariables = ({
  isError,
  searchVariables,
  addNewVariableContract,
  columns,
  rows,
  loading,
}) => {
  return (
    <>
      {isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title='Listado Variables Contrato'
            backpath='/applications'
          />
          <Box sx={sxSearchTables}>
            <SearchTableWithRequest
              searchOptions={searchVariables}
              buttonOptions={{
                add: addNewVariableContract,
                label: 'Crear',
              }}
              privilege='cgr.alertas.crear_variables_contrato'
            />
            <DynamicTableAlert
              columns={columns ?? []}
              rows={rows}
              loading={loading}
            />
          </Box>
        </>
      )}
    </>
  )
}

export default ViewVariables
