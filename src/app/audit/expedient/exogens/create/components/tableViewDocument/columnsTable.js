export const columnsTable = ({ columnsFile }) => {
  const columns = columnsFile.map((columnName) => ({
    field: columnName,
    headerName: columnName,
    width: 250,
  }))

  return columns
}
