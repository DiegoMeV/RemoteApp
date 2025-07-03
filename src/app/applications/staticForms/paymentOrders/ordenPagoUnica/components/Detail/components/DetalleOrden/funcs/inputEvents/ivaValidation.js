import toast from 'react-hot-toast'

export const ivaValidation = async ({
  getFormValue,
  getValues,
  setValue,
  nit_compania,
  ordenPagouData,
  rowSelected,
  ordenPagoU_nroContrato,
  ordenPagoU_tipoContrato,
  getProcedureResult,
}) => {
  const recalcular_impuesto = getFormValue('orden_pagou.recalcular_impuesto') ? 'S' : 'N'
  const params = {
    UnaCompania: {
      type: 'IN',
      value: nit_compania,
    },
    UnOpuOrden: {
      type: 'IN',
      value: ordenPagouData?.orden,
    },
    UnOpuValor: {
      type: 'IN',
      value: getFormValue('orden_pagou.valor'),
    },
    UnDataBaseIva: {
      type: 'IN',
      value: rowSelected?.iva ?? 0,
    },
    UnOpuIva: {
      type: 'IN',
      value: getFormValue('orden_pagou.iva'),
    },
    UnOpuNroContrato: {
      type: 'IN',
      value: ordenPagoU_nroContrato,
    },
    UnOpuTipoContrato: {
      type: 'IN',
      value: ordenPagoU_tipoContrato,
    },
    UnRecalcularImpuesto: {
      type: 'IN',
      value: recalcular_impuesto,
    },
    UnDopuNroDetalleContrato: {
      type: 'IN',
      value: getValues('nro_detalle_contrato'),
    },
    OutIva: {
      type: 'OUT',
    },
    OutStatus: {
      type: 'OUT',
    },
    OutMessage: {
      type: 'OUT',
    },
  }
  const responseIvaValidation = await getProcedureResult({
    statement: `BEGIN siif.pkgweb_orden_pago.dordenpagou_iva_validate(
                                                                          :UnaCompania,
                                                                          :UnOpuOrden,
                                                                          :UnOpuValor,
                                                                          :UnDataBaseIva,
                                                                          :UnOpuIva,
                                                                          :UnOpuNroContrato,
                                                                          :UnOpuTipoContrato,
                                                                          :UnRecalcularImpuesto,
                                                                          :UnDopuNroDetalleContrato,
                                                                          :OutIva,
                                                                          :OutStatus,
                                                                          :OutMessage); END;`,
    params,
  })

  if (responseIvaValidation?.data?.outBinds?.OutStatus === 'ERROR') {
    toast.error(
      responseIvaValidation?.data?.outBinds?.OutMessage ?? 'Error al realizar pretext item IVA'
    )
    return 'No se pudo validar el IVA del servicio'
  }

  const outIva = responseIvaValidation?.data?.outBinds?.OutIva
  setValue('iva', outIva)

  return true
}
