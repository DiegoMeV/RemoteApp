import { TableRow } from '@mui/material'
import CellHeader from './CellHeader'

const TableHeaders = ({ columns, rowSize, orderBy, handleSort, order, filters, handleFilter }) => {
  const { pinnedLeftColumns, normalColumns, pinnedRightColumns } = columns
  return (
    <TableRow>
      {pinnedLeftColumns?.map((column) => {
        return (
          <CellHeader
            key={column.field}
            column={column}
            rowSize={rowSize}
            orderBy={orderBy}
            handleSort={handleSort}
            order={order}
            filters={filters}
            handleFilter={handleFilter}
          />
        )
      })}

      {normalColumns?.map((column) => (
        <CellHeader
          key={column.field}
          column={column}
          rowSize={rowSize}
          orderBy={orderBy}
          handleSort={handleSort}
          order={order}
          filters={filters}
          handleFilter={handleFilter}
        />
      ))}

      {pinnedRightColumns?.map((column) => {
        return (
          <CellHeader
            key={column.field}
            column={column}
            rowSize={rowSize}
            orderBy={orderBy}
            handleSort={handleSort}
            order={order}
            filters={filters}
            handleFilter={handleFilter}
          />
        )
      })}
    </TableRow>
  )
}

export default TableHeaders
