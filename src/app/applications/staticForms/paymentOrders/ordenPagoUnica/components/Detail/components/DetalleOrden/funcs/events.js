import { typeHandlers } from '../../../../../funcs'

export const postSubmit = async ({ nit_compania, data, getProcedureResult }) => {
  const convertDate = typeHandlers['date']
  const params = {
    UnaCompania: {
      type: 'IN',
      value: nit_compania,
    },
    UnOpuOrden: {
      type: 'IN',
      value: Number(data?.orden),
    },
    UnOpuTipo: {
      type: 'IN',
      value: data?.tipo ?? null,
    },
    UnOpuFecha: {
      type: 'IN',
      value: convertDate(data?.fecha),
    },
    UnOpuTipoCompcnt: {
      type: 'IN',
      value: data?.tipo_compcnt ?? null,
    },
    UnOpuConcepto: {
      type: 'IN',
      value: data?.concepto ?? null,
    },
    UnOpuTercero: {
      type: 'IN',
      value: data?.tercero ?? null,
    },
    UnOpuTerceroType: {
      type: 'IN',
      value: data?.tercero_type ?? null,
    },
    UnOpuValor: {
      type: 'IN',
      value: data?.valor ?? 0,
    },
    UnOpuIva: {
      type: 'IN',
      value: data?.iva ?? 0,
    },
    UnOpuNroContrato: {
      type: 'IN',
      value: data?.nro_contrato ?? null,
    },
    UnOpuTipoContrato: {
      type: 'IN',
      value: data?.tipo_contrato ?? null,
    },
    UnOpuAnticipo: {
      type: 'IN',
      value: data?.anticipo ?? 0,
    },
    UnOpuNroLegalizacion: {
      type: 'IN',
      value: data?.nro_legalizacion ?? null,
    },
    UnOpuNroComprobanteAlm: {
      type: 'IN',
      value: data?.nro_comprobante_alm ?? null,
    },
    UnOpuTipoComprobanteAlm: {
      type: 'IN',
      value: data?.tipo_comprobante_alm ?? null,
    },
    UnRecalcularImpuesto: {
      type: 'IN',
      value: data?.recalcular_impuesto ?? 'N',
    },
    OutStatus: {
      type: 'OUT',
    },
    OutMessage: {
      type: 'OUT',
    },
  }
  const resultProcedure = await getProcedureResult({
    statement:
      'BEGIN siif.pkgweb_orden_pago.dordenpagou_post_submit(:UnaCompania,:UnOpuOrden,:UnOpuTipo,:UnOpuFecha,:UnOpuTipoCompcnt,:UnOpuConcepto,:UnOpuTercero,:UnOpuTerceroType,:UnOpuValor,:UnOpuIva,:UnOpuNroContrato,:UnOpuTipoContrato,:UnOpuAnticipo,:UnOpuNroLegalizacion,:UnOpuNroComprobanteAlm,:UnOpuTipoComprobanteAlm,:UnRecalcularImpuesto,:OutStatus,:OutMessage); END;',
    params,
  })
  return resultProcedure
}

export const postDelete = async ({ nit_compania, getFormValue, data, getProcedureResult }) => {
  const convertDate = typeHandlers['date']

  const params = {
    UnaCompania: {
      type: 'IN',
      value: nit_compania,
    },
    UnOpuOrden: {
      type: 'IN',
      value: Number(data?.orden),
    },
    UnOpuTipo: {
      type: 'IN',
      value: getFormValue('orden_pagou.tipo') ?? null,
    },
    UnOpuFecha: {
      type: 'IN',
      value: convertDate(getFormValue('orden_pagou.fecha')),
    },
    UnOpuTipoCompcnt: {
      type: 'IN',
      value: getFormValue('orden_pagou.tipo_compcnt') ?? null,
    },
    UnOpuConcepto: {
      type: 'IN',
      value: getFormValue('orden_pagou.concepto') ?? null,
    },
    UnOpuNroContrato: {
      type: 'IN',
      value: getFormValue('orden_pagou.nro_contrato') ?? null,
    },
    UnOpuTipoContrato: {
      type: 'IN',
      value: getFormValue('orden_pagou.tipo_contrato') ?? null,
    },
    UnOpuAnticipo: {
      type: 'IN',
      value: getFormValue('orden_pagou.anticipo') ?? null,
    },
    UnRecalcularImpuesto: {
      type: 'IN',
      value: getFormValue('orden_pagou.recalcular_impuesto') ? 'S' : 'N',
    },
    OutStatus: {
      type: 'OUT',
    },
    OutMessage: {
      type: 'OUT',
    },
  }

  const resultProcedure = await getProcedureResult({
    statement: `BEGIN siif.pkgweb_orden_pago.dordenpagou_post_delete(
                                                        :UnaCompania,
                                                        :UnOpuOrden,
                                                        :UnOpuTipo,
                                                        :UnOpuFecha,
                                                        :UnOpuTipoCompcnt,
                                                        :UnOpuConcepto,
                                                        :UnOpuNroContrato,
                                                        :UnOpuTipoContrato,
                                                        :UnOpuAnticipo,
                                                        :UnRecalcularImpuesto,
                                                        :OutStatus,
                                                        :OutMessage); END;`,
    params,
  })
  return resultProcedure
}
