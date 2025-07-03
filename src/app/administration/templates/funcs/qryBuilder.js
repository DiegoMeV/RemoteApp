export const qryBuilder = (querySearch, cursor) => {
  let qry = `?rowsPerPage=20`
  qry += cursor ? `&cursor=${cursor}` : ''
  qry += querySearch ? `&querySearch=${querySearch}` : ''

  return qry
}
