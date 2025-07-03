export const QUERY_IMPUTACION_CONTABLE = ({ nit_compania, queryParamsPks }) => {
  return `SELECT IC.*, TRIM(TER.nombre) || ' ' || TRIM(TER.apellido_1) || ' ' || TRIM(TER.apellido_2) nombre_tercero 
            
          FROM SIIF.IMPUTACION_CNTU IC 

          JOIN SIIF.TERCERO TER 
          ON TER.nit_compania = IC.nit_compania 
          AND TER.tercero = IC.tercero
            
          WHERE IC.nit_compania = ${nit_compania} AND IC.orden = ${queryParamsPks?.orden}`
}
