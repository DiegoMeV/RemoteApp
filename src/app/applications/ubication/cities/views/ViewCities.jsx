import { ErrorPage, getRowClassName } from '@/lib'
import { SearchTableWithRequest, TitleAlerts } from '../../../components'
import { DataGridPremium } from '@mui/x-data-grid-premium'
import { Box } from '@mui/material'
import { sxSearchTables } from '@/app/applications/styles'

const ViewCities = ({
  cities,
  isLoading,
  isError,
  searchCities,
  model,
  setModel,
  columns,
  addNewCitie,
  apiRef,
}) => {
  return (
    <>
      {isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title='Listado de municipios'
            backpath='/applications'
          />
          <Box sx={sxSearchTables}>
            <SearchTableWithRequest
              searchOptions={searchCities}
              buttonOptions={{
                add: addNewCitie,
                label: 'Crear',
              }}
              privilege='cgr.alertas.crear_municipios'
            />
            <DataGridPremium
              apiRef={apiRef}
              columns={columns ?? []}
              rows={cities?.data ?? []}
              loading={isLoading}
              getRowClassName={getRowClassName}
              rowCount={cities?.paginacion?.total ?? 0}
              paginationMode='server'
              pagination
              paginationModel={model}
              onPaginationModelChange={(model) => {
                setModel(model)
              }}
              pageSizeOptions={[25, 50, 100]}
              initialState={{
                pinnedColumns: {
                  right: ['options'],
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

export default ViewCities
