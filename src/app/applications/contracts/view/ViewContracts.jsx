import { DynamicTableAlert, SearchTableWithRequest } from '../../components'
import { BasicTitle, ErrorPage } from '@/lib'
import { Box } from '@mui/material'
import { sxSearchTables } from '../../styles'

const ViewContracts = ({
  isError,
  searchContract,
  addVariable,
  columns,
  loadingRows,
  rows,
  model,
  handlePaginationModelChange,
}) => {
  // TODO: Implementar para el cambio de pantalla de tabla a formulario: refetch

  return (
    <>
      {isError ? (
        <ErrorPage />
      ) : (
        <Box sx={sxSearchTables}>
          <BasicTitle
            title='Contratos'
            backpath='/applications'
          />
          <SearchTableWithRequest
            searchOptions={searchContract}
            buttonOptions={{
              add: addVariable,
              label: 'Crear',
            }}
            privilege='cgr.alertas.crear_contratos'
          />
          <DynamicTableAlert
            columns={columns}
            loading={loadingRows}
            rows={rows?.data ?? []}
            paginationModel={model}
            handlePaginationModelChange={handlePaginationModelChange}
            rowCount={rows?.pagination?.total ?? 0}
          />
        </Box>
      )}
    </>
  )
}

export default ViewContracts
