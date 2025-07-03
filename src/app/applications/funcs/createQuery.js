export const createQuery = ({ search, model }) => {
  let query = `?page=${model?.page + 1}&pageSize=${model?.pageSize}&aumentarInfo=true`
  if (search?.searchText) query += `&palabraClave=${search?.searchText}`
  return query
}

export const createPaginationQry = ({ search, model }) => {
  let query = `?page=${model?.page + 1}&pageSize=${model?.pageSize}`
  if (search?.searchText) query += `&palabraClave=${search?.searchText}`
  return query
}

export const buildQryVariables = (searchText, category) => {
  return searchText
    ? `?palabraClave=${searchText}&activo=true&categoria=${category}`
    : `?activo=true&categoria=${category}`
}
