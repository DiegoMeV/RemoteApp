import { ErrorPage } from '@/lib'
import { DynamicTableAlert, SearchTableWithRequest, TitleAlerts } from '../../../components'
import { Box } from '@mui/material'
import { sxSearchTables } from '../../../styles'

const ViewProvidence = ({
  infoProvince,
  loadingProvince,
  isErrorProvince,
  addProvidence,
  columns,
  searchProvidence,
}) => {
  return (
    <>
      {isErrorProvince ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title='Listado de departamentos'
            backpath='/applications'
          />
          <Box sx={sxSearchTables}>
            <SearchTableWithRequest
              searchOptions={searchProvidence}
              buttonOptions={{
                add: addProvidence,
                label: 'Crear',
              }}
              privilege='cgr.alertas.crear_departamentos'
            />
            <DynamicTableAlert
              columns={columns ?? []}
              rows={infoProvince?.data ?? []}
              loading={loadingProvince}
            />
          </Box>
        </>
      )}
    </>
  )
}

export default ViewProvidence
