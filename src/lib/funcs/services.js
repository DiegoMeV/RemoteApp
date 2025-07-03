export const buildQueryStringUserService = (pageSize, cursor, querySearch) => {
  let queryString = `?rowsPerPage=${pageSize}`
  queryString += querySearch ? `&querySearch=${querySearch}` : ''
  queryString += cursor ? `&cursor=${cursor}` : ''
  return queryString
}

export const buildQueryWithPagination = (pageSize, cursor, querySearch) => {
  let queryString = pageSize ? `?rowsPerPage=${pageSize}` : ''
  queryString += querySearch ? `&querySearch=${querySearch}` : ''
  queryString += cursor ? `&cursor=${cursor}` : ''
  return queryString
}

export const buildQueryAlerts = (page, pageSize, search) => {
  let query = page ? `?page=${page + 1}&pageSize=${pageSize}&aumentarInfo=true` : ''
  if (search) query += `&palabraClave=${search}`
  return query
}

export const buildQueryPaginationValueListCursor = (pageSize, cursor, querySearch) => {
  let query = pageSize ? `rowsPerPage=${pageSize}` : ''
  query += querySearch ? `&querySearch=${querySearch}` : ''
  query += cursor ? `&cursor=${cursor}` : ''
  return query
}

export const buildQueryPaginationValueListPage = (pageSize, page, querySearch) => {
  let query = pageSize ? `pageSize=${pageSize}` : ''
  query += querySearch ? `&palabraClave=${querySearch}` : ''
  query += page ? `&page=${page + 1}` : ''
  return query
}
