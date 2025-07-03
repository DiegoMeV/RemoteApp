export const qryBuilderEntities = ({ search, model }) => {
  let qry = `?page=${model?.page + 1}&pageSize=${model?.pageSize}`
  qry += search ? `&palabraClave=${search?.searchText}` : ''

  return qry
}
