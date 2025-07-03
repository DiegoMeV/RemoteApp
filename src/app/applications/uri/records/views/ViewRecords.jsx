import { DynamicTableAlert, SearchTableWithRequest, TitleAlerts } from '../../../components'
import { ErrorPage, NoAccessCard } from '@/lib'
import { Box } from '@mui/material'
import { sxSearchTables } from '@/app/applications/styles'
import { AccessControl } from '@/libV4'

const ViewRecords = ({
  dataRecord,
  columns,
  isLoading,
  isError,
  handleCreate,
  searchAlert,
  model,
  handlePaginationModelChange,
}) => {
  return (
    <AccessControl
      privilege='cgr.uri.visualizar_registros'
      nodeContent={<NoAccessCard />}
    >
      {isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title='Registros Ari'
            backpath='/applications'
          />
          <Box sx={sxSearchTables}>
            <SearchTableWithRequest
              searchOptions={searchAlert}
              buttonOptions={{
                add: handleCreate,
                label: 'Crear',
              }}
              privilege='cgr.uri.crear_registros'
            />
            <DynamicTableAlert
              columns={columns ?? []}
              rows={dataRecord?.data ?? []}
              loading={isLoading}
              paginationModel={model}
              handlePaginationModelChange={handlePaginationModelChange}
              rowCount={dataRecord?.pagination?.total ?? 0}
            />
          </Box>
        </>
      )}
    </AccessControl>
  )
}

export default ViewRecords
