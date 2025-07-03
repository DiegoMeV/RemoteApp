export const qryBuilderTreasury = ({ model, querySearch }) => {
  let qry = `?searchString=${querySearch || ''}`
  qry += model ? `&page=${model?.page + 1}&rowsPerPage=${model?.pageSize}` : ''
  return qry
}
