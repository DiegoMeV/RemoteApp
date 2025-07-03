import { DynamicTableAlert, SearchTableWithRequest, TitleAlerts } from '../../components'
import { ErrorPage } from '@/lib'
import { Box } from '@mui/material'
import { sxSearchTables } from '../../styles'

const ViewVariables = ({ isError, searchVariables, addNewVariable, columns, rows, loading }) => {
  return (
    <>
      {isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title='Listado Variables'
            backpath='/applications'
          />
          <Box sx={sxSearchTables}>
            <SearchTableWithRequest
              searchOptions={searchVariables}
              buttonOptions={{
                add: addNewVariable,
                label: 'Crear',
              }}
              privilege='cgr.alertas.crear_variables'
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
