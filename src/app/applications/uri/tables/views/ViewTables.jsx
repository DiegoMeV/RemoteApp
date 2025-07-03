import { DynamicTableAlert, SearchTableWithRequest, TitleAlerts } from '../../../components'
import { BackdropLoading, CustomModal, ErrorPage, GenericTable } from '@/lib'
import { TableInfo } from '../components'
import { sxSearchTables } from '@/app/applications/styles'
import { Box } from '@mui/material'

const ViewTables = ({
  dataTables,
  columns,
  isLoading,
  isError,
  handleCreate,
  modalComminments,
  comminmentsData,
  informativeModal,
  tableRequest,
  refetchTables,
  searchTables,
  pendingGeneration,
  model,
  handlePaginationModelChange,
}) => {
  const { rows, columnsToComminments, loadingComminments, errorComminments, updatingComminments } =
    comminmentsData

  const disabledKeyDownSpace = (_, event) => {
    if (event.code === 'Space') {
      event.defaultMuiPrevented = true
    }
  }

  return (
    <>
      {isError ? (
        <ErrorPage />
      ) : (
        <>
          <BackdropLoading loading={updatingComminments || pendingGeneration} />
          <TitleAlerts
            title='Mesas Ari'
            backpath='/applications'
          />
          <Box sx={sxSearchTables}>
            <SearchTableWithRequest
              searchOptions={searchTables}
              buttonOptions={{
                add: handleCreate,
                label: 'Crear',
              }}
              privilege={'cgr.uri.crear_mesas'}
            />
            <DynamicTableAlert
              columns={columns ?? []}
              rows={dataTables?.data ?? []}
              loading={isLoading}
              paginationModel={model}
              handlePaginationModelChange={handlePaginationModelChange}
              rowCount={dataTables?.pagination?.total ?? 0}
            />
          </Box>
          {modalComminments.show && (
            <CustomModal
              title='Compromisos'
              open={modalComminments.show}
              handleClose={modalComminments.handleShow}
              size='lg'
            >
              {errorComminments ? (
                <ErrorPage />
              ) : (
                <GenericTable
                  rows={rows}
                  loading={loadingComminments}
                  columns={columnsToComminments}
                  onCellKeyDown={disabledKeyDownSpace}
                  density='comfortable'
                  sx={{ height: 'calc(100vh - 250px)' }}
                />
              )}
            </CustomModal>
          )}
          {informativeModal.show && (
            <CustomModal
              title='Información de la mesa'
              open={informativeModal.show}
              handleClose={informativeModal.handleShow}
              size='xl'
            >
              <TableInfo
                tableRequest={tableRequest}
                informativeModal={informativeModal}
                refetchTables={refetchTables}
              />
            </CustomModal>
          )}
        </>
      )}
    </>
  )
}

export default ViewTables
