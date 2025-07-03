export const buildGeneralQuery = (
  pageSize,
  cursor,
  querySearch,
  searchParameter,
  paginationCursor,
  page,
  isPaginated = true,
  paginationSkip = false
) => {
  let qry = ''

  if (isPaginated) {
    qry += pageSize ? `?rowsPerPage=${pageSize}` : ''
    qry += paginationCursor ? (cursor ? `&cursor=${cursor}` : '') : `&page=${page}`
    qry += paginationSkip ? (page * pageSize === 0 ? '' : `&skip=${page * pageSize}`) : ''
  }

  qry += querySearch
    ? `${isPaginated ? '&' : '?'}${searchParameter ?? 'querySearch'}=${querySearch}`
    : ''

  return qry
}
