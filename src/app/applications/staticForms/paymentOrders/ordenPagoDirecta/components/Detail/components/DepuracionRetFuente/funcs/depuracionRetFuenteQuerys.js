export const QUERY_DEP_RET_FUENTE = ({ nit_compania, queryParamsPks }) => {
  return `SELECT DRF.*
            
            FROM SIIF.RTEFTE_ORDEN DRF 
            
            WHERE DRF.nit_compania = ${nit_compania} AND DRF.orden = ${queryParamsPks?.orden}`
}
