import { ErrorPage, getRowClassName, resizeColumns } from '@/lib'
import { SearchTableWithRequest, TitleAlerts } from '@/app/applications/components'
import { Box } from '@mui/material'
import { sxSearchTables } from '../../styles'
import { DataGridPremium } from '@mui/x-data-grid-premium'
import { useEffect } from 'react'

const ViewEntity = ({
  entities,
  isLoading,
  isError,
  columns,
  addNewEntity,
  searchEntity,
  model,
  setModel,
  apiRef,
}) => {
  useEffect(() => {
    resizeColumns(apiRef, isLoading)
  }, [entities?.data, isLoading, apiRef])

  return (
    <>
      {isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title={`Listado de entes `}
            backpath='/applications'
          />
          <Box sx={sxSearchTables}>
            <SearchTableWithRequest
              searchOptions={searchEntity}
              buttonOptions={{
                add: addNewEntity,
                label: 'Crear',
              }}
              privilege='cgr.alertas.crear_entidades'
            />
            <DataGridPremium
              apiRef={apiRef}
              columns={columns ?? []}
              rows={entities?.data ?? []}
              loading={isLoading}
              getRowClassName={getRowClassName}
              rowCount={entities?.pagination?.total ?? 0}
              paginationMode='server'
              pagination
              paginationModel={model}
              onPaginationModelChange={(model) => {
                setModel(model)
              }}
              pageSizeOptions={[10, 25, 50, 100]}
              initialState={{
                pinnedColumns: {
                  right: ['activo', 'options'],
                },
              }}
              sx={{ backgroundColor: 'backgroundWhite1' }}
            />
          </Box>
        </>
      )}
    </>
  )
}

export default ViewEntity
