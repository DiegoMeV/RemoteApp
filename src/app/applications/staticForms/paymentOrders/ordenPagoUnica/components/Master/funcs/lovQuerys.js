export const tipoContratoQuery = ({ nit_compania, queryParams }) => {
  return `select tipo_contrato,descripcion 
                  from tipo_contrato 
                  where nit_compania = ${nit_compania} 
                  and clase = 'NORMAL' 
                  and activo = 'S' 
                  and tipo_contrato = nvl(${
                    queryParams?.untipocontrato ? `${queryParams?.untipocontrato}` : null
                  }, tipo_contrato)
                  and (
                  translate(upper(tipo_contrato), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
                  translate(upper(descripcion), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU'))
                  ORDER BY descripcion`
}

//OR ${globalVariables?.usertype} IN( 'SAYAYIN', 'DIRECTIVO' )

export const nroDocContratoQuery = ({
  nit_compania,
  getFormValue,
  globalVariables,
  queryParams,
}) => {
  const query = `SELECT cont.nrodoc,cont.prefijo, cont.id_centrocosto,
                      SUBSTR(REPLACE(cont.descripcion, CHR(10), ' '),1,255) descripcion, 
                      cont.nro_contrato,cont.dependencia, cc.nombre nombre_centrocosto
                      FROM contrato cont
                      JOIN centrocosto cc
                      ON cc.id_centrocosto = cont.id_centrocosto
                      AND cc.nit_compania = cont.nit_compania
                      WHERE 
                      cont.tipo_contrato = '${getFormValue('orden_pagou.tipo_contrato')}' AND 
                      cont.nit_compania = ${nit_compania} 
                      AND (division= ${
                        globalVariables?.additionalUserInfo?.division
                      } or exists(select 'x' 
                                  from division_usuario d 
                                  where d.nit_compania = ${nit_compania} 
                                  AND d.usuario = '${globalVariables?.usuario}' and
                                        to_char(division) LIKE decode(to_char(d.divisionu), '0' , '%' ,to_char(d.divisionu))) 
                          ) AND 
                      cont.NRO_CONTRATO NOT IN 
                      (SELECT ORDEN_PAGO.NRO_CONTRATO 
                      FROM ORDEN_PAGO 
                      WHERE 
                      ORDEN_PAGO.NRO_CONTRATO=cont.NRO_CONTRATO AND 
                      ORDEN_PAGO.NIT_COMPANIA=cont.NIT_COMPANIA AND 
                      ORDEN_PAGO.TIPO_CONTRATO=cont.TIPO_CONTRATO AND 
                      ORDEN_PAGO.ESTADO NOT IN('A') AND 
                      (ORDEN_PAGO.TIPO= 'FINAL' or ORDEN_PAGO.TIPO= 'COMISION')) AND
                      cont.NRO_CONTRATO = nvl(${
                        queryParams?.unnumerocontrato ?? null
                      }, cont.NRO_CONTRATO) 
                      order by 1, 2, 3`
  return query
}

export const centroCostoQuery = ({ nit_compania }) => {
  return `select id_centrocosto,nombre
                  from centrocosto
                  where nit_compania = ${nit_compania} 
                  and (
                  translate(upper(id_centrocosto), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
                  translate(upper(nombre), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU'))
                  order by 1`
}

export const unidadNegocioQuery = ({ nit_compania }) => {
  return `select codigo,nombre 
                  from unidad_negocio 
                  where nit_compania=${nit_compania} 
                  and (
                  translate(upper(codigo), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
                  translate(upper(nombre), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU'))
                  and activo='S' 
                  order by 1`
}

export const idBancoQuery = ({ nit_compania, getFormValue }) => {
  return `SELECT ID_BANCO,
                      NRO_CUENTA,
                      TIPO_CUENTA,
                      NRO_CUENTA_FIDU,
                      NOMBRE_CUENTA
                  FROM   CUENTA_BANCARIA_TERCERO
                  WHERE  NIT_COMPANIA = ${nit_compania} AND
                      TERCERO = ${getFormValue('orden_pagou.tercero')} AND
                      TERCERO_TYPE = '${getFormValue('orden_pagou.tercero_type')}'
                  ORDER BY 1, 2`
}

export const terceroEmbargoQuery = ({ nit_compania }) => {
  return `SELECT tercero, tercero_type,nombre|| ' ' ||apellido_1|| ' ' ||apellido_2 Nombre FROM tercero  WHERE NIT_COMPANIA = ${nit_compania} 
                  and (
                  translate(upper(tercero), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
                  translate(upper(tercero_type), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU')OR
                  translate(upper(apellido_1), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU')OR
                  translate(upper(apellido_2), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU'))
                  ORDER BY 3`
}
