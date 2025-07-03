import { ErrorPage } from '@/lib'
import { DynamicTableAlert, SearchTableWithRequest, TitleAlerts } from '../../components'
import { Box } from '@mui/material'
import { sxSearchTables } from '../../styles'

const ViewConstractsTypes = ({
  isError,
  columns,
  rows,
  loadingRows,
  addNewTypeContract,
  searchTypeContract,
}) => {
  return (
    <>
      {isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title='Listado de modalidad de contratación'
            backpath='/applications'
          />
          <Box sx={sxSearchTables}>
            <SearchTableWithRequest
              searchOptions={searchTypeContract}
              buttonOptions={{
                add: addNewTypeContract,
                label: 'Crear',
              }}
              privilege='cgr.alertas.crear_tipos_contrato'
            />
            <DynamicTableAlert
              columns={columns}
              rows={rows}
              loading={loadingRows}
            />
          </Box>
        </>
      )}
    </>
  )
}

export default ViewConstractsTypes
