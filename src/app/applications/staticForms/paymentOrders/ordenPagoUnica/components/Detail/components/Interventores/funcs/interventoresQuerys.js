export const QUERY_INTERVENTORES = ({ nit_compania, queryParamsPks }) => {
  return `SELECT INTER.*, terc.nombre|| ' ' ||terc.apellido_1|| ' ' ||terc.apellido_2 nombre_tercero, INTER_CON.interno, INTER_CON.cargo, INTER_CON.principal
            
            FROM SIIF.INTERVENTORES_POR_OPU INTER 

            LEFT JOIN SIIF.TERCERO TERC ON INTER.TERCERO = TERC.TERCERO AND INTER.NIT_COMPANIA = TERC.NIT_COMPANIA

            LEFT JOIN SIIF.INTERVENTORES_POR_CONTRATO INTER_CON ON INTER_CON.TERCERO = INTER.TERCERO AND INTER_CON.NIT_COMPANIA = INTER.NIT_COMPANIA
            
            WHERE INTER.nit_compania = ${nit_compania} AND INTER.orden = ${queryParamsPks?.orden}`
}

export const LOV_INTERVENTORES = ({ nit_compania, getFormValue }) => {
  return `SELECT tercero.tercero tercero, tercero.nombre|| ' ' ||tercero.apellido_1|| ' ' ||tercero.apellido_2 nombre, 
                          tercero.tercero_type tercero_type 
                          FROM tercero, interventores_por_contrato i 
                          where tercero.tercero=i.tercero and 
                          tercero.tercero_type=i.tercero_type and 
                          tercero.nit_compania=i.nit_compania and 
                          i.nro_contrato= ${getFormValue('orden_pagou.nro_contrato')} and 
                          i.tipo_contrato= '${getFormValue('orden_pagou.tipo_contrato')}' and  
                          i.nit_compania= ${nit_compania} and
                          tercero.tercero <> 0  
                          and (
                          translate(upper(tercero.tercero), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
                          translate(upper(tercero.nombre), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
                          translate(upper(tercero.apellido_1), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
                          translate(upper(tercero.apellido_2), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU')
                          )
                          ORDER BY 3,2`
}
