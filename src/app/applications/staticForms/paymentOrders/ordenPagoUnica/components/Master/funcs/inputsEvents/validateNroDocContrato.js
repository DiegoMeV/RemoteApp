export const validateNroDocContrato = async ({
  getQueryResult,
  getFormValue,
  nit_compania,
  setFormValue,
}) => {
  const responseBanco = await getQueryResult(`SELECT
        id_banco_pago,
        nro_cuenta_pago,
        tipo_cuenta_pago
    FROM
        contrato
    WHERE
            tipo_contrato = '${getFormValue('orden_pagou.tipo_contrato')}'
        AND nro_contrato = ${getFormValue('orden_pagou.nro_contrato')}
        AND nit_compania = ${nit_compania}`)

  const dataBanco = responseBanco?.data?.[0]
  setFormValue('orden_pagou.id_banco', dataBanco?.id_banco_pago)
  setFormValue('orden_pagou.nro_cuenta', dataBanco?.nro_cuenta_pago)
  setFormValue('orden_pagou.tipo_cuenta', dataBanco?.tipo_cuenta_pago)

  const responseTercero = await getQueryResult(`SELECT
                      nvl(validado_tributaria, 'N') Mival,
                      tercero,
                      tercero_type
                  FROM
                      contrato
                  WHERE
                          tipo_contrato = '${getFormValue('orden_pagou.tipo_contrato')}'
                      AND nro_contrato = ${getFormValue('orden_pagou.nro_contrato')}
                      AND nit_compania = ${nit_compania}`)
  const dataTercero = responseTercero?.data?.[0]
  const tipo = getFormValue('orden_pagou.tipo')
  if (tipo === 'ANTICIPO' && dataTercero?.Mival === 'N') {
    setFormValue('orden_pagou.nrodoc_contrato', null)
    setFormValue('orden_pagou.tipo_contrato', null)
    setFormValue('orden_pagou.desc_contrato', '')
    setFormValue('orden_pagou.nro_contrato', null)
    setFormValue('orden_pagou.id_centrocosto', null)
    setFormValue('orden_pagou.nombre_centro', '')
    return 'El contrato no está validado tributariamente'
  }

  const yearDate = new Date(getFormValue('orden_pagou.fecha')).getFullYear()
  const monthDate = new Date(getFormValue('orden_pagou.fecha')).getMonth()

  const responseOrdenPago = await getQueryResult(`SELECT
                        SUM(t.valor) mivalor
                    FROM
                        (
                            SELECT
                                SUM(nvl(valor, 0)) + SUM(nvl(iva, 0)) valor
                            FROM
                                orden_pago
                            WHERE
                                    nit_compania = ${nit_compania}
                                AND tercero = ${dataTercero?.tercero}
                                AND tercero_type = '${dataTercero?.tercero_type}'
                                AND to_char(fecha, 'YYYY') = to_char(${yearDate})
                                AND to_char(fecha, 'MM') = to_char(${monthDate})
                                AND estado IN ( 'V', 'P', 'F' )
                            UNION ALL
                            SELECT
                                SUM(nvl(valor, 0)) + SUM(nvl(iva, 0)) valor
                            FROM
                                orden_pagou
                            WHERE
                                    nit_compania = ${nit_compania}
                                AND tercero = ${dataTercero?.tercero}
                                AND tercero_type = '${dataTercero?.tercero_type}'
                                AND to_char(fecha, 'YYYY') = to_char(${yearDate})
                                AND to_char(fecha, 'MM') = to_char(${monthDate})
                                AND estado IN ( 'V', 'P', 'F' )
                        ) t`)

  const mivalor = responseOrdenPago?.data?.[0]?.mivalor ?? 0

  if (mivalor > 0 && nit_compania !== 890102006) {
    return `El tercero tiene pagos en el mes por ${mivalor}`
  }

  return true
}
