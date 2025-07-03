import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import { NoDataOverlay, TableHeaders } from '../components'
import { getRowClassNameCT } from '../../funcs'
import { cellSyles } from '../funcs'
import { useStoreState } from 'easy-peasy'

const ViewBasicTable = ({
  containerProps,
  columns,
  paginatedRows,
  loading,
  rowSize,
  rowHeight,
  orderBy,
  handleSort,
  order,
  filters,
  handleFilter,
  paginationProps,
  noRenderRows,
  showPagination,
  handleDoubleClick = () => {},
  rowId,
}) => {
  const dark = useStoreState((state) => state.darkTheme.dark) === 'dark'

  const { pinnedLeftColumns, normalColumns, pinnedRightColumns } = columns

  return (
    <div className='shadow-md rounded-lg border border-gray-200 dark:border-gray-700 col-span-12 relative'>
      {noRenderRows && (
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-20 '>
          <div className='pointer-events-auto'>
            {loading ? <CircularProgress size={100} /> : <NoDataOverlay />}
          </div>
        </div>
      )}

      <TableContainer
        {...containerProps}
        className={`w-full overflow-auto ${containerProps.className ?? ''} backgroundwhite1`}
      >
        <Table className={`w-full min-w-[max-content] ${noRenderRows ? 'h-full' : ''}`}>
          {/* Table Header */}
          <TableHead className='sticky top-0 z-10 shadow-md shadow-gray-300 dark:shadow-gray-900'>
            <TableHeaders
              columns={columns}
              rowSize={rowSize}
              orderBy={orderBy}
              handleSort={handleSort}
              order={order}
              filters={filters}
              handleFilter={handleFilter}
            />
          </TableHead>

          {/* Table Body */}
          <TableBody className='h-full'>
            {paginatedRows?.map((row, index) => (
              <TableRow
                hover
                onDoubleClick={() => handleDoubleClick(row)}
                key={row?.[rowId] ?? index}
              >
                {pinnedLeftColumns.map((column) => (
                  <TableCell
                    key={column.field}
                    align={column.align}
                    size={rowSize}
                    sx={cellSyles(column, rowHeight)}
                    className={`${getRowClassNameCT(dark, index, row)}`}
                  >
                    {column.renderCell
                      ? column.renderCell(row, row[column.field])
                      : row[column.field]}
                  </TableCell>
                ))}

                {normalColumns.map((column) => (
                  <TableCell
                    key={column.field}
                    align={column.align}
                    size={rowSize}
                    sx={cellSyles(column, rowHeight)}
                    className={`${getRowClassNameCT(dark, index, row)}`}
                  >
                    {column.renderCell
                      ? column.renderCell(row, row[column.field])
                      : row[column.field]}
                  </TableCell>
                ))}

                {pinnedRightColumns.map((column) => (
                  <TableCell
                    key={column.field}
                    align={column.align}
                    size={rowSize}
                    sx={cellSyles(column, rowHeight)}
                    className={`${getRowClassNameCT(dark, index, row)}`}
                  >
                    {column.renderCell
                      ? column.renderCell(row, row[column.field])
                      : row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showPagination && (
        <div className='backgroundwhite1 flex w-full justify-end p-2'>
          <TablePagination
            {...paginationProps}
            labelRowsPerPage='Filas por página'
          />
        </div>
      )}
    </div>
  )
}

export default ViewBasicTable
