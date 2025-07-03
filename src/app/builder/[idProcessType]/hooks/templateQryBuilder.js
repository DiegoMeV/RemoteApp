// DELETE IN NEXT PR
export const templateQryBuilder = (cursor, pageSize, querySearch) => {
  let queryParams = ''
  queryParams += pageSize ? `?rowsPerPage=${pageSize}` : ''
  queryParams += querySearch ? `&querySearch=${querySearch}` : ''
  queryParams += cursor ? `&cursor=${cursor}` : ''

  return queryParams
}
