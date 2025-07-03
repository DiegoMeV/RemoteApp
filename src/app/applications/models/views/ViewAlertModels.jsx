import { Box } from '@mui/material'
import { DynamicTableAlert, SearchTableWithRequest, TitleAlerts } from '../../components'
import { ErrorPage } from '@/lib'
import { sxSearchTables } from '../../styles'

const ViewAlertModels = ({ models, loadingRows, isError, columns, addNewModel, searchModel }) => {
  return (
    <>
      {isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title='Listado Modelos'
            backpath='/applications'
          />
          <Box sx={sxSearchTables}>
            <SearchTableWithRequest
              searchOptions={searchModel}
              buttonOptions={{
                add: addNewModel,
                label: 'Crear',
              }}
              privilege='cgr.alertas.crear_modelos'
            />
            <DynamicTableAlert
              columns={columns ?? []}
              rows={models?.data ?? []}
              loading={loadingRows}
            />
          </Box>
        </>
      )}
    </>
  )
}

export default ViewAlertModels
