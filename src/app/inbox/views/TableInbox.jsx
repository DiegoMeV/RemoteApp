import { BasicTable, ErrorPage } from '@/libV4'
import { CustomToolbar } from '../components'

const TableInbox = ({
  statesData,
  handleDoubleClick,
  slotProps,
  rowCountState,
  paginationModel,
  setPaginationModel,
}) => {
  const { infoRows, columnsApi, loadingInforRows, isError } = statesData
  const handlePaginationModelChange = (newModel) => {
    setPaginationModel(newModel)
  }
  return isError ? (
    <ErrorPage />
  ) : (
    <div className='backgroundGray2 p-4 rounded-xl'>
      <CustomToolbar {...slotProps} />
      <div className='grid grid-cols-12 gap-4'>
        <BasicTable
          rows={infoRows}
          columns={columnsApi}
          loading={loadingInforRows}
          handleDoubleClick={handleDoubleClick}
          pagination={{
            count: rowCountState ?? 1,
            page: paginationModel.page ?? 10,
            rowsPerPage: paginationModel.pageSize ?? 0,
            onPageChange: (_, page) =>
              handlePaginationModelChange({
                page: page,
                pageSize: paginationModel.pageSize,
              }),
            onRowsPerPageChange: (e) => {
              const rowsPerPage = parseInt(e.target.value, 10)
              handlePaginationModelChange({
                page: 0,
                pageSize: rowsPerPage,
              })
            },
          }}
          containerProps={{
            className: 'h-[calc(100vh-300px)] backgroundwhite1',
          }}
        />
      </div>
    </div>
  )
}

export default TableInbox
