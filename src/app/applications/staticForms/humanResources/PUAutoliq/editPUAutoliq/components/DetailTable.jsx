import { BasicTable } from '@/libV4'
import { columnsDetailPUAtoliq } from '../constants'

const DetailTable = ({ infoDetail, totalCount, paginationModel, setPaginationModel }) => {
  const handlePaginationModelChange = (newModel) => {
    setPaginationModel(newModel)
  }
  return (
    <div className={`grid grid-cols-12 gap-4 p-4`}>
      <BasicTable
        containerProps={{
          className: 'h-[calc(100vh-375px)]',
        }}
        columns={columnsDetailPUAtoliq}
        rows={infoDetail ?? []}
        pagination={{
          count: totalCount ?? 1,
          page: paginationModel?.page ?? 10,
          rowsPerPage: paginationModel?.pageSize ?? 0,
          onPageChange: (_, page) =>
            handlePaginationModelChange({
              page: page,
              pageSize: paginationModel?.pageSize,
            }),
          onRowsPerPageChange: (e) => {
            const rowsPerPage = parseInt(e.target.value, 10)
            handlePaginationModelChange({
              page: 0,
              pageSize: rowsPerPage,
            })
          },
        }}
      />
    </div>
  )
}

export default DetailTable
