export const useQueryBuilder = (idVersion, isInCgr) => {
  let qry = ''
  qry += idVersion ? `/${idVersion}` : ''
  qry += isInCgr ? '?entity=cgr' : ''
  return qry
}
