export const buildQueryUsers = (cursor, querySearch, isActive, pageSize) => {
  let qry = ``
  qry += pageSize ? `?rowPerPage=${pageSize}` : ''
  qry += cursor ? `&cursor=${cursor}` : ''
  qry += querySearch ? `&querySearch=${querySearch}` : ''
  qry += isActive ? `&isActive=${isActive}` : ''
  return qry
}
