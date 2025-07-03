export const useBuildQueryUsers = ({ pageSize, cursor, querySearch }) => {
  let qry = `?rowsPerPage=${pageSize}&isActive=true`
  qry += cursor ? `&cursor=${cursor}` : ''
  qry += querySearch ? `&querySearch=${querySearch}` : ''

  return qry
}
