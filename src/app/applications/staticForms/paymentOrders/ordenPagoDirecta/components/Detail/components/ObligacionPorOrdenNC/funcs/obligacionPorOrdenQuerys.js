export const QUERY_OBLIGACION_POR_ORDEN = ({ nit_compania, queryParamsPks }) => {
  return `SELECT 
          OPO.nit_compania,
          OPO.orden,
          OPO.nro_comprobantepptal,
          OPO.nrodoc_compptal,
          OPO.tipo_compptal,
          C.concepto,
          NVL(SUM(M.valor), 0) AS valor
        FROM siif.obligaciones_por_orden_w OPO
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
  const vigencia = getFormValue('orden_pago.vigencia')

  const tipoCompptal = {
    VIGENCIA: 'OBLIGACION',
    RESERVA: 'OBLIGACION_RESERVA',
    CXP: 'CXP',
  }

  return `SELECT DISTINCT
              obligacion.nrodoc,
              obligacion.prefijo,
              obligacion.tipo_compptal,
              nvl(
                  sum(movpresupuestal.valor),
                  0
              ) valor,
              obligacion.concepto,
              obligacion.nro_comprobantepptal
          FROM
              comprobantepptal_w obligacion,
              movpresupuestal_w  movpresupuestal
          WHERE
                  obligacion.tipo_compptal = '${tipoCompptal[vigencia]}'
              AND obligacion.nit_compania = ${nit_compania}
              AND obligacion.estado != 'A'
              AND movpresupuestal.nro_comprobantepptal = obligacion.nro_comprobantepptal
              AND movpresupuestal.tipo_compptal = obligacion.tipo_compptal
              AND movpresupuestal.nit_compania = obligacion.nit_compania
              AND obligacion.prefijo = ${getFormValue('orden_pago.prefijo')}
          GROUP BY
              obligacion.nrodoc,
              obligacion.prefijo,
              obligacion.tipo_compptal,
              obligacion.concepto,
              obligacion.nro_comprobantepptal
          ORDER BY
              2,
              1`
}
