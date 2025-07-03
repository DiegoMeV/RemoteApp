export const QUERY_DETALLE_ORDEN = ({ nit_compania, queryParamsPks }) => {
  return `SELECT DT.*, CG.nombre nombre_cpto_gasto, DC.descripcion desc_detalle_contrato
          
          FROM SIIF.DORDEN_PAGOU DT 
          
          JOIN SIIF.DETALLE_CONTRATO DC 
          ON DC.nit_compania = DT.nit_compania 
          AND DC.nro_detalle_contrato = DT.nro_detalle_contrato 
          AND DC.tipo_contrato = DT.tipo_contrato
          AND DC.nro_contrato = DT.nro_contrato

          JOIN SIIF.CPTO_GASTO CG 
          ON CG.nit_compania = DT.nit_compania 
          AND CG.cpto_gasto = DT.cpto_gasto
          
          WHERE DT.nit_compania = ${nit_compania} AND DT.orden = ${queryParamsPks?.orden}`
}
