export const QUERY_ENTRADA_ALMACEN = ({ nit_compania, queryParamsPks }) => {
  return `SELECT EA.*, CA.observaciones desc_entrada_alm
            
            FROM SIIF.ENTRADAS_ORDENU EA 

            JOIN SIIF.comprobante_alm CA ON
            EA.nit_compania = CA.nit_compania AND
            EA.nrodoc = CA.nrodoc
            
            WHERE EA.nit_compania = ${nit_compania} AND EA.orden = ${queryParamsPks?.orden}`
}

export const LOV_ENTRADA_ALMACEN = ({ nit_compania, getFormValue }) => {
  return `SELECT 	
              comprobante_alm.NRODOC,
              comprobante_alm.tipo_comprobante_alm, 
              comprobante_alm.nro_comprobantealm,
              comprobante_alm.observaciones,
              sum(NVL(movimiento_alm.cantidad,0)*NVL(movimiento_alm.costo_unit,0))-sum(NVL(movimiento_alm.iva,0)) valor,
              sum(NVL(movimiento_alm.iva,0)) iva
              FROM 	
              comprobante_alm, 
              TIPO_COMPROBANTE_ALM,
              movimiento_alm
              WHERE 	comprobante_alm.nit_compania = ${nit_compania} AND 
              comprobante_alm.nit_compania=tipo_comprobante_alm.nit_compania and
              comprobante_alm.tipo_comprobante_alm = tipo_comprobante_alm.tipo_comprobante_alm AND 					
              tipo_comprobante_alm.clasemovalm IN('ENTRADA_GENERAL','ENTRADA_COMPRA') AND 			
              comprobante_alm.tipo_contrato = '${getFormValue('orden_pagou.tipo_contrato')}' AND 	
              comprobante_alm.nro_contrato = 	${getFormValue('orden_pagou.nro_contrato')} and
              comprobante_alm.estado!='A' and
              comprobante_alm.nit_compania=movimiento_alm.nit_compania and
              comprobante_alm.tipo_comprobante_alm=movimiento_alm.tipo_comprobante_alm and
              comprobante_alm.nro_comprobantealm=movimiento_alm.nro_comprobantealm and
              NOT EXISTS(
              SELECT 
              EO.nro_comprobantealm
              FROM ENTRADAS_ORDENU EO,ORDEN_PAGOU OP
              WHERE EO.NRO_comprobantealm=comprobante_alm.nro_comprobantealm AND 
              EO.NIT_COMPANIA=comprobante_alm.NIT_COMPANIA AND
              EO.TIPO_COMPROBANTE_ALM=comprobante_alm.TIPO_COMPROBANTE_ALM AND
              EO.NIT_COMPANIA=OP.NIT_COMPANIA AND
              EO.ORDEN=OP.ORDEN AND
              OP.ESTADO!='A'
              )
              group by comprobante_alm.NRODOC,
              comprobante_alm.tipo_comprobante_alm, 
              comprobante_alm.nro_comprobantealm,
              comprobante_alm.observaciones`
}
