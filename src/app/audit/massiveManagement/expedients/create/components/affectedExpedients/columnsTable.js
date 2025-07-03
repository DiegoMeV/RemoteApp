export const columnsTable = ({ columnsFile }) => {
  const columns = columnsFile.map((columnName) => ({
    field: columnName,
    headerName: columnName,
    width: 250,
  }))

  columns.push({
    field: 'typeProcess',
    headerName: 'Tipo de proceso',
    width: 250,
    renderCell: (params) => {
      return params?.row?.processType?.name
    },
  })

  return columns
}
