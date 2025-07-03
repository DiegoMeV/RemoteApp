export const infoPeriod = ({ nit_compania }) => {
  return `SELECT *
FROM siif.periodo_nom
WHERE nit_compania = '${nit_compania}'
ORDER BY periodo DESC`
}

export const infoVinculation = ({ nit_compania }) => {
  return `SELECT *
FROM siif.tipos_vinculacion
WHERE nit_compania = '${nit_compania}'
ORDER BY vinculacion`
}

export const infoDetailPayroll = ({ nit_compania, periodo, nomina, modelDetail, busqueda }) => {
  return `SELECT qpag.*
            FROM  (
              SELECT qorigen.*,
              rownum AS numfilapag,
              Count(*) OVER () AS total_count
                FROM   (
                  SELECT epn.*,
                  NVL( epn.liquidar, 'N' )  liquidar_actual
                  FROM siif.empleados_por_nomina epn
                  WHERE epn.nit_compania = '${nit_compania}'
                  AND epn.periodo = '${periodo}'
                  AND epn.nomina = '${nomina}'
                  AND (
                  TRANSLATE(upper(tercero), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE TRANSLATE(UPPER('%${busqueda}%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') 
                  OR
                  TRANSLATE(upper(nombre_empleado), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE TRANSLATE(UPPER('%${busqueda}%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU')
                  )
                ORDER BY epn.nombre_empleado ASC
                  ) qorigen
              ) qpag
              WHERE  qpag.numfilapag BETWEEN ( (${modelDetail?.page}) 
              * ${modelDetail?.pageSize} + 1 )
              AND (${modelDetail?.page + 1} * ${modelDetail?.pageSize} )
`
}

export const infoIndividualPayroll = ({
  nit_compania,
  paramsPeriodo,
  paramsVinculacion,
  paramsNomina,
}) => {
  return `SELECT *
FROM siif.v_nomina_web
WHERE nit_compania = '${nit_compania}'
AND periodo = '${paramsPeriodo}'
AND vinculacion = '${paramsVinculacion}'
AND nomina = '${paramsNomina}'`
}

export const infoIndividualVolante = ({
  nit_compania,
  periodo,
  nomina,
  tercero,
  tercero_type,
  id_unico,
}) => {
  return `SELECT epn.*,
       nvl(epn.liquidar, 'N') liquidar_actual,
       vp.fecha_inicio,
       vp.fecha_fin,
       vp.total_ingresos,
       vp.total_deducciones,
       vp.total_a_pagar,
       vp.periodo_info,
       vp.nomina_info,
       vp.empleado_info,
       vp.valor
FROM siif.empleados_por_nomina epn
LEFT JOIN siif.v_info_volantepago_web vp ON vp.nit_compania = epn.nit_compania
                                        AND vp.periodo = epn.periodo
                                        AND vp.nomina = epn.nomina
                                        AND vp.tercero = epn.tercero
WHERE epn.nit_compania = '${nit_compania}'
AND epn.periodo = '${periodo}'
AND epn.nomina = '${nomina}'
AND epn.tercero = '${tercero}'
and epn.tercero_type = '${tercero_type}'
and epn.id_unico ='${id_unico}'`
}

export const infoProcesses = ({ nit_compania }) => {
  return `SELECT liquidacion,
                  descripcion
          FROM siif.proceso_liquidacion
          WHERE nit_compania = '${nit_compania}'`
}

export const infoPayrollProcesses = ({ nit_compania, periodo, nomina, busqueda }) => {
  return `
            SELECT pro_in.liquidacion,
                    pro_li.descripcion
            FROM siif.procesos_incluidos pro_in
            JOIN siif.proceso_liquidacion pro_li ON pro_li.nit_compania = pro_in.nit_compania
            AND pro_li.liquidacion = pro_in.liquidacion
            WHERE pro_in.nit_compania = '${nit_compania}'
            AND pro_in.periodo = ${periodo}
            AND pro_in.nomina = ${nomina}
            AND (
              translate(upper(pro_in.liquidacion), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%${busqueda}%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') 
              OR
              translate(upper(pro_li.descripcion), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%${busqueda}%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') 
                ) `
}
