import { typeHandlers } from '../../../../../funcs'

export const calculateSum = (imputacionContableRows) => {
  let debTotal = 0
  let cretTotal = 0

  imputacionContableRows?.forEach((element) => {
    debTotal += Number(element?.debito)
    cretTotal += Number(element?.credito)
  })

  return { debTotal, cretTotal }
}

export const getParamsImpuesto = ({ nit_compania, queryParamsPks, getFormValue }) => {
  const UnTipo = getFormValue('orden_pagou.tipo')
  const validationUnTipo = ['ANTICIPO', 'FINAL']
  const recalcular_impuesto = getFormValue('orden_pagou.recalcular_impuesto')

  if ((recalcular_impuesto === 'S') & validationUnTipo.includes(UnTipo)) {
    return
  }

  const UnContrato = getFormValue('orden_pagou.nro_contrato')
  const UnTipoContrato = getFormValue('orden_pagou.tipo_contrato')
  const UnValor = getFormValue('orden_pagou.valor')
  const UnIva = getFormValue('orden_pagou.iva')
  const Unafecha = getFormValue('orden_pagou.fecha')

  const convertDate = typeHandlers['date']

  const params = {
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
    UnContrato: { type: 'IN', value: UnContrato ?? null },
    UnTipoContrato: { type: 'IN', value: UnTipoContrato ?? null },
    UnValor: { type: 'IN', value: UnValor ? Number(UnValor) : null },
    UnIva: { type: 'IN', value: UnIva ? Number(UnIva) : null },
    UnTipo: { type: 'IN', value: UnTipo ?? null },
    UnTercero: { type: 'IN', value: getFormValue('orden_pagou.tercero') ?? null },
    UnTerceroType: { type: 'IN', value: getFormValue('orden_pagou.tercero_type') ?? null },
    Unafecha: { type: 'IN', value: Unafecha ? convertDate(Unafecha) : null },
    UnaClasePago: {
      type: 'IN',
      value: null,
    },
    UntipoOrden: {
      type: 'IN',
      value: null,
    },
  }

  return params
}
