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

export const QUERY_ORDEN_PAGO = ({ nit_compania, queryParamsPks, queryParams }) => {
  const whereWithProcess = getWhereWithProcess({ queryParams })

  return `
  SELECT OPD.*, 
          TRIM(TER.nombre) || ' ' || TRIM(TER.apellido_1) || ' ' || TRIM(TER.apellido_2) nombre_tercero,
          TRIM(TERS.nombre) || ' ' || TRIM(TERS.apellido_1) || ' ' || TRIM(TERS.apellido_2) nombre_tercero_sol,
          TRIM(TERO.nombre) || ' ' || TRIM(TERO.apellido_1) || ' ' || TRIM(TERO.apellido_2) nombre_tercero_ordenador, 
          nvl(TER.pensionado,'N') pensionado,
          CCO.nombre nombre_centro,  
          TCO.descripcion desc_contrato,
          CPTC.nombre nombre_cpto_causacion
        
        FROM SIIF.ORDEN_PAGO OPD 

        LEFT JOIN SIIF.TERCERO TER 
        ON TER.nit_compania = OPD.nit_compania 
        AND TER.tercero = OPD.tercero 

        LEFT JOIN SIIF.TERCERO TERS 
        ON TERS.nit_compania = OPD.nit_compania 
        AND TERS.tercero = OPD.tercero_sol 

        LEFT JOIN SIIF.TERCERO TERO 
        ON TERO.nit_compania = OPD.nit_compania 
        AND TERO.tercero = OPD.tercero_ordenador 
        
        LEFT JOIN SIIF.CENTROCOSTO CCO
        ON CCO.nit_compania = OPD.nit_compania
        AND CCO.id_centrocosto = OPD.id_centrocosto

        LEFT JOIN SIIF.TIPO_CONTRATO TCO
        ON TCO.nit_compania = OPD.nit_compania  
        AND TCO.tipo_contrato = OPD.tipo_contrato

        LEFT JOIN SIIF.CPTO_CAUSACION CPTC
        ON CPTC.nit_compania = OPD.nit_compania  
        AND CPTC.cpto_causacion = OPD.cpto_causacion
        
        WHERE OPD.nit_compania = ${nit_compania} ${
    whereWithProcess ?? `AND OPD.orden = ${queryParamsPks?.orden}`
  } `
}
