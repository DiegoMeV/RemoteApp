import { Box } from '@mui/material'
import { DynamicTableAlert, SearchTableWithRequest, TitleAlerts } from '../../components'
import { ErrorPage } from '@/lib'
import { sxSearchTables } from '../../styles'

const ViewCriteria = ({
  infoCriteria,
  loadingCriteria,
  isErrorCriteria,
  columns,
  addRegion,
  searchCriteria,
  model,
  setModel,
}) => {
  return (
    <>
      {isErrorCriteria ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title='Lista de Criterios'
            backpath='/applications'
          />
          <Box sx={sxSearchTables}>
            <SearchTableWithRequest
              searchOptions={searchCriteria}
              buttonOptions={{
                add: addRegion,
                label: 'Crear',
              }}
              privilege={'cgr.alertas.crear_criterios'}
            />
            <DynamicTableAlert
              columns={columns ?? []}
              rows={infoCriteria?.data ?? []}
              loading={loadingCriteria}
              paginationModel={model}
              handlePaginationModelChange={(model) => {
                setModel(model)
              }}
              rowCount={infoCriteria?.paginacion?.total ?? 0}
            />
          </Box>
        </>
      )}
    </>
  )
}

export default ViewCriteria
