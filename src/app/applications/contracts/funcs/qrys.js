export const buildQryContractors = (searchText) => {
  let qry = `?aumentarInfo=true`
  if (searchText) {
    qry += `&palabraClave=${searchText}`
  }
  return qry
}
