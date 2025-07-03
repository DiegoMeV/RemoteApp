export const QUERY_OBLIGACION_POR_ORDEN = ({ nit_compania, queryParamsPks }) => {
  return `SELECT 
          OPO.nit_compania,
          OPO.orden,
          OPO.nro_comprobantepptal,
          OPO.nrodoc_compptal,
          OPO.tipo_compptal,
          C.concepto,
          NVL(SUM(M.valor), 0) AS valor
        FROM siif.obli_por_ordenu OPO
        JOIN siif.comprobantepptal_w C
          ON OPO.nro_comprobantepptal = C.nro_comprobantepptal
          AND OPO.nit_compania = C.nit_compania
        JOIN siif.movpresupuestal_w M
          ON OPO.nro_comprobantepptal = M.nro_comprobantepptal
          AND OPO.nit_compania = M.nit_compania
        WHERE OPO.nit_compania = ${nit_compania}
          AND OPO.orden = ${queryParamsPks?.orden}
        GROUP BY 
          OPO.nit_compania,
          OPO.orden,
          OPO.nro_comprobantepptal,
          OPO.nrodoc_compptal,
          OPO.tipo_compptal,
          C.concepto`
}

export const LOV_OBLICACION_W = ({ nit_compania, getFormValue }) => {
  return `SELECT DISTINCT obligacion.nrodoc,
                            obligacion.prefijo,
                            obligacion.tipo_compptal,
                            Nvl(SUM(movpresupuestal.valor), 0) valor,
                            obligacion.concepto,
                            obligacion.nro_comprobantepptal
            FROM   comprobantepptal_w obligacion,
                  comprobantepptal_w compromiso,
                  movpresupuestal_w movpresupuestal,
                  v_relxcompw relxcomp
            WHERE  obligacion.tipo_compptal = 'OBLIGACION'
                  AND obligacion.nit_compania = ${nit_compania}
                  AND obligacion.estado = 'V'
                  AND relxcomp.nro_comprobantepptal = obligacion.nro_comprobantepptal
                  AND relxcomp.tipo_compptal = obligacion.tipo_compptal
                  AND relxcomp.nro_comprobantepptal = obligacion.nro_comprobantepptal
                  AND relxcomp.nro_relacionado = compromiso.nro_comprobantepptal
                  AND relxcomp.nit_compania = compromiso.nit_compania
                  AND relxcomp.tipo_relacionado = compromiso.tipo_compptal
                  AND movpresupuestal.nro_comprobantepptal =
                      obligacion.nro_comprobantepptal
                  AND movpresupuestal.tipo_compptal = obligacion.tipo_compptal
                  AND movpresupuestal.nit_compania = obligacion.nit_compania
                  AND compromiso.tipo_compptal = 'COMPROMISO'
                  AND compromiso.nro_contrato (+) = ${getFormValue('orden_pagou.nro_contrato')}
                  AND compromiso.tipo_contrato (+) = '${getFormValue('orden_pagou.tipo_contrato')}'
                  AND Nvl(compromiso.reserva_cancelada, 'N') != 'S'
                  AND compromiso.nit_compania = obligacion.nit_compania
                  AND To_char(obligacion.nro_comprobantepptal) NOT IN
                      (SELECT DISTINCT To_char(nro_comprobantepptal)
                        FROM   obli_por_ordenu
                        WHERE
                          nit_compania = ${nit_compania})
            GROUP  BY obligacion.nrodoc,
                      obligacion.prefijo,
                      obligacion.tipo_compptal,
                      obligacion.concepto,
                      obligacion.nro_comprobantepptal
            UNION ALL
            SELECT DISTINCT obligacion.nrodoc,
                            obligacion.prefijo,
                            obligacion.tipo_compptal,
                            Nvl(SUM(movpresupuestal.valor), 0) valor,
                            obligacion.concepto,
                            obligacion.nro_comprobantepptal
            FROM   comprobantepptal_w obligacion,
                  comprobantepptal_w reserva,
                  movpresupuestal_w movpresupuestal,
                  v_relxcompw relxcomp
            WHERE  obligacion.tipo_compptal = 'OBLIGACION_RESERVA'
                  AND obligacion.nit_compania = ${nit_compania}
                  AND obligacion.estado = 'V'
                  AND relxcomp.nro_comprobantepptal = obligacion.nro_comprobantepptal
                  AND relxcomp.tipo_compptal = obligacion.tipo_compptal
                  AND relxcomp.nro_comprobantepptal = obligacion.nro_comprobantepptal
                  AND relxcomp.nro_relacionado = reserva.nro_comprobantepptal
                  AND relxcomp.nit_compania = reserva.nit_compania
                  AND relxcomp.tipo_relacionado = reserva.tipo_compptal
                  AND movpresupuestal.nro_comprobantepptal =
                      obligacion.nro_comprobantepptal
                  AND movpresupuestal.tipo_compptal = obligacion.tipo_compptal
                  AND movpresupuestal.nit_compania = obligacion.nit_compania
                  AND reserva.tipo_compptal = 'RESERVA'
                  AND Nvl(reserva.reserva_cancelada, 'N') != 'S'
                  AND reserva.nro_contrato (+) = ${getFormValue('orden_pagou.nro_contrato')}
                  AND reserva.tipo_contrato (+) = '${getFormValue('orden_pagou.tipo_contrato')}'
                  AND To_char(obligacion.nro_comprobantepptal) NOT IN
                      (SELECT DISTINCT To_char(nro_comprobantepptal)
                        FROM   obli_por_ordenu
                        WHERE
                          nit_compania = ${nit_compania})
            GROUP  BY obligacion.nrodoc,
                      obligacion.prefijo,
                      obligacion.tipo_compptal,
                      obligacion.concepto,
                      obligacion.nro_comprobantepptal
            UNION ALL
            SELECT DISTINCT obligacion.nrodoc,
                            obligacion.prefijo,
                            obligacion.tipo_compptal,
                            Nvl(SUM(movpresupuestal.valor), 0) valor,
                            obligacion.concepto,
                            obligacion.nro_comprobantepptal
            FROM   comprobantepptal_w obligacion,
                  comprobantepptal_w compromiso,
                  comprobantepptal_w reserva,
                  movpresupuestal_w movpresupuestal,
                  v_relxcompw relxcomp
            WHERE  obligacion.tipo_compptal = 'CXP'
                  AND obligacion.nit_compania = ${nit_compania}
                  AND obligacion.estado = 'V'
                  AND relxcomp.nro_comprobantepptal = obligacion.nro_comprobantepptal
                  AND relxcomp.tipo_compptal = obligacion.tipo_compptal
                  AND relxcomp.nro_comprobantepptal = obligacion.nro_comprobantepptal
                  AND relxcomp.nro_relacionado = reserva.nro_comprobantepptal
                  AND relxcomp.nit_compania = reserva.nit_compania
                  AND relxcomp.tipo_relacionado = reserva.tipo_compptal
                  AND movpresupuestal.nro_comprobantepptal =
                      obligacion.nro_comprobantepptal
                  AND movpresupuestal.tipo_compptal = obligacion.tipo_compptal
                  AND movpresupuestal.nit_compania = obligacion.nit_compania
                  AND reserva.tipo_compptal = 'OBLIGACION'
                  AND reserva.nro_relacionado = compromiso.nro_comprobantepptal
                  AND reserva.nit_compania = compromiso.nit_compania
                  AND reserva.tipo_relacionado = compromiso.tipo_compptal
                  AND compromiso.tipo_compptal = 'COMPROMISO'
                  AND compromiso.nro_contrato (+) = ${getFormValue('orden_pagou.nro_contrato')}
                  AND compromiso.tipo_contrato (+) = '${getFormValue('orden_pagou.tipo_contrato')}'
                  AND To_char(obligacion.nro_comprobantepptal) NOT IN
                      (SELECT DISTINCT To_char(nro_comprobantepptal)
                        FROM   obli_por_ordenu
                        WHERE
                          nit_compania = ${nit_compania})
            GROUP  BY obligacion.nrodoc,
                      obligacion.prefijo,
                      obligacion.tipo_compptal,
                      obligacion.concepto,
                      obligacion.nro_comprobantepptal
            ORDER  BY 1 DESC`
}

// export const LOV_OBLICACION_W = ({ nit_compania }) => {
//   return `SELECT  obligacion.nrodoc,
//                             obligacion.prefijo,
//                             obligacion.tipo_compptal,
//                             obligacion.concepto,
//                             obligacion.nro_comprobantepptal,
//                             NVL(SUM(M.valor), 0) AS valor

//             FROM   comprobantepptal_w obligacion

//             JOIN siif.movpresupuestal_w M
//               ON obligacion.nro_comprobantepptal = M.nro_comprobantepptal
//               AND obligacion.nit_compania = M.nit_compania

//             WHERE  obligacion.tipo_compptal = 'OBLIGACION'
//                   AND obligacion.nit_compania = ${nit_compania}
//                   AND obligacion.estado = 'V'
//                   AND prefijo = 2025

//             GROUP BY
//             obligacion.nrodoc,
//             obligacion.prefijo,
//             obligacion.tipo_compptal,
//             obligacion.concepto,
//             obligacion.nro_comprobantepptal`
// }
