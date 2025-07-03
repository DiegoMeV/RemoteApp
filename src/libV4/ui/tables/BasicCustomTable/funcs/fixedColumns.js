import { Checkbox } from '@mui/material'

export const getColumnCheckBox = (
  selectedRows,
  externalRows,
  handleSelectRow,
  handleSelectAllRows,
  loading,
  getCheckBoxProps,
  rowId
) => {
  return {
    headerName: '',
    field: 'checkbox',
    width: 30,
    pinned: 'left',
    renderHeader: () => {
      return (
        <Checkbox
          disabled={loading}
          checked={
            externalRows ? Object.keys?.(selectedRows)?.length >= externalRows?.length : false
          }
          onChange={() => handleSelectAllRows(externalRows)}
        />
      )
    },
    renderCell: (row) => {
      const checkBoxProps = getCheckBoxProps(row) || {}
      return (
        <Checkbox
          {...checkBoxProps}
          checked={!!selectedRows?.[row?.[rowId]]}
          onChange={() => handleSelectRow(row)}
        />
      )
    },
  }
}
