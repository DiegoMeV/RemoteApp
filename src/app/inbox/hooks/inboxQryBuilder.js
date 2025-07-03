export const inboxQryBuilder = (skip, pageSize, searchText) => {
  let qry = ''
  qry += pageSize ? `&rowsPerPage=${pageSize}` : ''
  qry += skip ? `&skip=${skip}` : ''
  qry += searchText ? `&searchString=${searchText}` : ''
  return qry
}

export const buildQuery = (paginationModel, infoMenu, searchModel) => {
  const skip = paginationModel.page * paginationModel.pageSize
  let qry = `?idGroup=${infoMenu?.id}`
  qry += `&rowsPerPage=${paginationModel.pageSize}`

  if (skip && skip !== 0) {
    qry += `&skip=${skip}`
  }
  if (searchModel?.trim() !== '') {
    qry += `&searchString=${searchModel}`
  }
  return qry
}
