export const onChangeNroDocContrato = async ({
  nit_compania,
  getFormValue,
  value,
  setFormValue,
  getQueryResult,
  globalVariables,
}) => {
  setFormValue('orden_pagou.nrodoc_contrato', value?.nrodoc)
  setFormValue('orden_pagou.id_centrocosto', value?.id_centrocosto)
  setFormValue('orden_pagou.nombre_centro', value?.nombre_centrocosto)
  setFormValue('orden_pagou.desc_contrato', value?.descripcion)
  setFormValue('orden_pagou.nro_contrato', value?.nro_contrato)
  setFormValue('orden_pagou.dependencia', value?.dependencia)

  const responseUniNeg = await getQueryResult(`SELECT
                                                    cont.unidad_negocio,
                                                    un.nombre nombre_unidad_negocio
                                                FROM
                                                    contrato cont
                                                JOIN unidad_negocio un
                                                ON cont.unidad_negocio = un.codigo
                                                AND cont.nit_compania = un.nit_compania
                                                
                                                WHERE
                                                        cont.tipo_contrato = '${getFormValue(
                                                          'orden_pagou.tipo_contrato'
                                                        )}'
                                                    AND cont.nro_contrato = ${getFormValue(
                                                      'orden_pagou.nro_contrato'
                                                    )}
                                                    AND cont.nit_compania = ${nit_compania}`)
  const dataUniNeg = responseUniNeg?.data?.[0]

  const unidadNegocio = dataUniNeg?.unidad_negocio
  const nombreUnidadNegocio = dataUniNeg?.nombre_unidad_negocio

  if (globalVariables?.req_unidad_negocio === 'S') {
    //Validar de donde sale req_unidad_negocio
    setFormValue('orden_pagou.unidad_negocio', unidadNegocio)
    setFormValue('orden_pagou.nombre_unidad_negocio', nombreUnidadNegocio)
  }

  //Falta realizar Join para obtener los nombres de centro costo y banco
  const responseTercero = await getQueryResult(`SELECT
                                                    ct.tercero,
                                                    t.nombre || ' ' || t.apellido_1 || ' ' || t.apellido_2 nombre_tercero,
                                                    ct.tercero_type,
                                                    substr(
                                                        replace(ct.descripcion,
                                                                chr(10),
                                                                ' '),
                                                        1,
                                                        60
                                                    ) descripcion,
                                                    ct.id_centrocosto,
                                                    ct.id_banco_pago,
                                                    ct.nro_cuenta_pago,
                                                    ct.tipo_cuenta_pago
                                                FROM
                                                    contrato ct

                                                JOIN tercero t 
                                                ON ct.tercero = t.tercero
                                                AND ct.nit_compania = t.nit_compania
                                                WHERE
                                                        ct.tipo_contrato = '${getFormValue(
                                                          'orden_pagou.tipo_contrato'
                                                        )}'
                                                    AND ct.nro_contrato = ${getFormValue(
                                                      'orden_pagou.nro_contrato'
                                                    )}
                                                    AND ct.nit_compania = ${nit_compania}`)

  const dataTercero = responseTercero?.data?.[0]

  setFormValue('orden_pagou.tercero', dataTercero?.tercero)
  setFormValue('orden_pagou.nombre_tercero', dataTercero?.nombre_tercero)
  setFormValue('orden_pagou.tercero_type', dataTercero?.tercero_type)
  setFormValue('orden_pagou.desc_contrato', dataTercero?.descripcion)
  setFormValue('orden_pagou.id_centrocosto', dataTercero?.id_centrocosto)
  setFormValue('orden_pagou.id_banco', dataTercero?.id_banco_pago)
  setFormValue('orden_pagou.nro_cuenta', dataTercero?.nro_cuenta_pago)
  setFormValue('orden_pagou.tipo_cuenta', dataTercero?.tipo_cuenta_pago)
}
