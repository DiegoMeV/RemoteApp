import { memo, useCallback, useMemo, useState } from 'react'
import { ViewBasicTable } from './views'
import { isEmpty } from '@/libV4/funcs'
import { useRowsBasicTable } from './hooks'
import { getColumnCheckBox } from './funcs'

const BasicTable = ({
  rows: externalRows,
  columns: externalColumns,
  loading,
  containerProps = {},
  rowSize = 'small',
  rowHeight,
  pagination,
  paginationLocal = {},
  showPagination = true,
  selectionModel = {},
  handleDoubleClick = () => {},
  rowId = 'id',
}) => {
  const { selectedRows, setSelectedRows, getCheckBoxProps = () => {} } = selectionModel

  const { defaultModel } = paginationLocal

  const handleSelectRow = useCallback(
    (row) => {
      setSelectedRows((prev) => {
        const newData = { ...prev }
        if (prev[row?.[rowId]]) {
          delete newData[row?.[rowId]]
          return newData
        }
        return {
          ...prev,
          [row?.[rowId]]: row,
        }
      })
    },
    [rowId, setSelectedRows]
  )

  const handleSelectAllRows = useCallback(
    (data) => {
      if (Object.keys?.(selectedRows)?.length >= data?.length) {
        setSelectedRows({})
        return
      }

      const allRows = data.reduce((acc, row) => {
        return { ...acc, [row?.[rowId]]: row }
      }, {})

      setSelectedRows(allRows)
    },
    [rowId, selectedRows, setSelectedRows]
  )

  const defaultPaginationModel = isEmpty(defaultModel) ? { page: 0, pageSize: 50 } : defaultModel

  const [paginationModel, setPaginationModel] = useState(defaultPaginationModel)

  const columns = useMemo(() => externalColumns, [externalColumns])

  const columnCheckBox = useMemo(
    () =>
      getColumnCheckBox(
        selectedRows,
        externalRows,
        handleSelectRow,
        handleSelectAllRows,
        loading,
        getCheckBoxProps,
        rowId
      ),
    [selectedRows, externalRows, handleSelectRow, handleSelectAllRows, loading, getCheckBoxProps]
  )

  const { pinnedLeftColumns, normalColumns, pinnedRightColumns } = useMemo(() => {
    let leftWidth = 0

    const left = []
    const normal = []
    const right = []

    const allColumns = selectedRows ? [columnCheckBox, ...columns] : columns

    allColumns.forEach((column) => {
      if (column.pinned === 'left') {
        column.left = leftWidth
        leftWidth += column.width || 150 // Default width if not provided
        left.push(column)
      } else if (column.pinned === 'right') {
        right.push(column)
      } else {
        normal.push(column)
      }
    })

    // Asignar right en orden inverso
    let rightWidth = 0
    for (let i = right.length - 1; i >= 0; i--) {
      right[i].right = rightWidth
      rightWidth += right[i].width || 150
    }

    return {
      pinnedLeftColumns: left,
      normalColumns: normal,
      pinnedRightColumns: right,
    }
  }, [columns, columnCheckBox, selectedRows])

  const { sortedRows, order, orderBy, filters, handleSort, handleFilter } = useRowsBasicTable(
    externalRows,
    columns
  )

  const paginatedRows = useMemo(() => {
    const { page, pageSize } = paginationModel
    return pagination ? sortedRows : sortedRows?.slice?.(page * pageSize, (page + 1) * pageSize)
  }, [paginationModel, pagination, sortedRows])

  const noRenderRows = loading || !paginatedRows?.length || paginatedRows?.length === 0

  const handlePaginationModelChange = (newModel) => {
    setPaginationModel(newModel)
  }

  const paginationProps = pagination ?? {
    count: sortedRows?.length ?? 1,
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
    ...paginationLocal,
  }

  return (
    <ViewBasicTable
      containerProps={containerProps}
      columns={{ pinnedLeftColumns, normalColumns, pinnedRightColumns }}
      columnsLength={externalColumns?.length}
      paginatedRows={paginatedRows}
      loading={loading}
      rowSize={rowSize}
      rowHeight={rowHeight}
      orderBy={orderBy}
      handleSort={handleSort}
      order={order}
      filters={filters}
      handleFilter={handleFilter}
      paginationProps={paginationProps}
      noRenderRows={noRenderRows}
      showPagination={showPagination}
      handleDoubleClick={handleDoubleClick}
      rowId={rowId}
    />
  )
}

export default memo(BasicTable)
