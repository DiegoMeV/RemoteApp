const getWhereWithProcess = ({ queryParams }) => {
  if (queryParams?.unaetapaproceso || queryParams?.unidactivity) {
    if (queryParams?.unprocesoorigen) {
      return `AND proceso = ${queryParams?.unprocesoorigen}`
    } else if (queryParams?.unidprocess) {
      return `AND id_process = ${queryParams?.unidprocess}`
    } else {
      return `AND proceso = ${queryParams?.unproceso} AND estado <> 'A'`
    }
  }
  return null
}

export const QUERY_ORDEN_PAGOU = ({ nit_compania, queryParamsPks, queryParams }) => {
  const whereWithProcess = getWhereWithProcess({ queryParams })

  return `
  SELECT SOP.*, 
          TRIM(TER.nombre) || ' ' || TRIM(TER.apellido_1) || ' ' || TRIM(TER.apellido_2) nombre_tercero, 
          nvl(TER.pensionado,'N') pensionado,
          CCO.nombre nombre_centro,  
          TCO.descripcion desc_contrato
        
        FROM SIIF.ORDEN_PAGOU SOP 

        LEFT JOIN SIIF.TERCERO TER 
        ON TER.nit_compania = SOP.nit_compania 
        AND TER.tercero = SOP.tercero 
        
        LEFT JOIN SIIF.CENTROCOSTO CCO
        ON CCO.nit_compania = SOP.nit_compania
        AND CCO.id_centrocosto = SOP.id_centrocosto

        LEFT JOIN SIIF.TIPO_CONTRATO TCO
        ON TCO.nit_compania = SOP.nit_compania  
        AND TCO.tipo_contrato = SOP.tipo_contrato
        
        WHERE SOP.nit_compania = ${nit_compania} ${
    whereWithProcess ?? `AND SOP.orden = ${queryParamsPks?.orden}`
  } `
}
