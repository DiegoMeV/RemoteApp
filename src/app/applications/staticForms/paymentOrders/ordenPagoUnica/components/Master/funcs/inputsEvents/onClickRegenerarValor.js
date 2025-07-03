import dayjs from 'dayjs'
import toast from 'react-hot-toast'

export const onClickRegenerarValor = async ({
  getFormValue,
  nit_compania,
  queryParamsPks,
  getProcedureResult,
  setFormValue,
  onSubmit,
}) => {
  const tipo = getFormValue('orden_pagou.tipo')
  const params = {
    P_Nit_compania: {
      type: 'IN',
      value: nit_compania,
    },
    P_Orden: {
      type: 'IN',
      value: Number(queryParamsPks?.orden),
    },
    P_Tipo_Orden: {
      type: 'IN',
      value: tipo ?? null,
    },
    P_Nro_Legalizacion: {
      type: 'IN',
      value: null,
    },
    P_Nro_Contrato: {
      type: 'IN',
      value: getFormValue('orden_pagou.nro_contrato'),
    },
    P_Tipo_Contrato: {
      type: 'IN',
      value: getFormValue('orden_pagou.tipo_contrato'),
    },
    P_Anticipo: {
      type: 'IN',
      value: getFormValue('orden_pagou.anticipo'),
    },
    P_Valor_Embargo: {
      type: 'IN',
      value: getFormValue('orden_pagou.valor_embargo'),
    },
    P_Valor: {
      type: 'OUT',
    },
    P_Iva: {
      type: 'OUT',
    },
    P_Total_orden: {
      type: 'OUT',
    },
    P_Error: {
      type: 'OUT',
    },
    P_Message: {
      type: 'OUT',
    },
  }

  const resultProcedure = await getProcedureResult({
    statement:
      'BEGIN siif.pkgweb_orden_pago.Generar_Valor_Multient(:P_Nit_compania,:P_Orden,:P_Tipo_Orden,:P_Nro_Legalizacion,:P_Nro_Contrato,:P_Tipo_Contrato,:P_Anticipo,:P_Valor_Embargo,:P_Valor,:P_Iva,:P_Total_orden,:P_Error,:P_Message); END;',
    params,
  })

  if (resultProcedure?.data?.outBinds?.P_Error === 'failed') {
    toast.error(resultProcedure?.P_Message ?? 'Error al ejecutar el procedimiento')
    return
  }
  const responseData = resultProcedure?.data?.outBinds
  setFormValue('orden_pagou.valor', responseData?.P_Valor)
  setFormValue('orden_pagou.iva', responseData?.P_Iva)
  setFormValue('orden_pagou.total_orden', responseData?.P_Total_orden)

  const paramsProcedure2 = {
    UnaCompania: {
      type: 'IN',
      value: nit_compania,
    },
    UnaOrden: {
      type: 'IN',
      value: Number(queryParamsPks?.orden),
    },
    UnaLegalizacion: {
      type: 'IN',
      value: null,
    },
    UnComprobanteAlm: {
      type: 'IN',
      value: null,
    },
    UnTipoCA: {
      type: 'IN',
      value: null,
    },
    UnContrato: {
      type: 'IN',
      value: getFormValue('orden_pagou.nro_contrato'),
    },
    UnTipoContrato: {
      type: 'IN',
      value: getFormValue('orden_pagou.tipo_contrato'),
    },
    UnValor: {
      type: 'IN',
      value: responseData?.P_Valor,
    },
    UnIva: {
      type: 'IN',
      value: responseData?.P_Iva,
    },
    UnTipo: {
      type: 'IN',
      value: tipo,
    },
    UnTercero: {
      type: 'IN',
      value: getFormValue('orden_pagou.tercero'),
    },
    UnTerceroType: {
      type: 'IN',
      value: getFormValue('orden_pagou.tercero_type'),
    },
    Unafecha: {
      type: 'IN',
      value: dayjs(getFormValue('orden_pagou.fecha')).format('YYYY-MM-DD HH:mm:ss'),
    },
    UnaClasePago: {
      type: 'IN',
      value: null,
    },
    UntipoOrden: {
      type: 'IN',
      value: null,
    },
  }

  await getProcedureResult({
    statement:
      'BEGIN siif.und_ordenu.GenerarImputacionmultient(:UnaCompania,:UnaOrden,:UnaLegalizacion,:UnComprobanteAlm,:UnTipoCA,:UnContrato,:UnTipoContrato,:UnValor,:UnIva,:UnTipo,:UnTercero,:UnTerceroType,:Unafecha,:UnaClasePago,:UntipoOrden); END;',
    params: paramsProcedure2,
  })
  onSubmit()
}
