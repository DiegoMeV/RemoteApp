import { Box } from '@mui/material'
import { DynamicTableAlert, SearchTableWithRequest, TitleAlerts } from '../../components'
import { ErrorPage } from '@/lib'
import { sxSearchTables } from '../../styles'

const ViewAlertBlocks = ({ loadingRows, isError, columns, rows, addBlock, searchBlocks }) => {
  return (
    <>
      {isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title='Listado Bloques'
            backpath='/applications'
          />
          <Box sx={sxSearchTables}>
            <SearchTableWithRequest
              searchOptions={searchBlocks}
              buttonOptions={{
                add: addBlock,
                label: 'Crear',
              }}
              privilege='cgr.alertas.crear_bloques'
            />
            <DynamicTableAlert
              columns={columns}
              rows={rows?.data ?? []}
              loading={loadingRows}
            />
          </Box>
        </>
      )}
    </>
  )
}

export default ViewAlertBlocks
