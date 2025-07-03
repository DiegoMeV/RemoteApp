import toast from 'react-hot-toast'

export const valorValidation = async ({
  getValues,
  setValue,
  nit_compania,
  ordenPagouData,
  rowSelected,
  ordenPagoU_nroContrato,
  ordenPagoU_tipoContrato,
  getProcedureResult,
  valorTotal = 0,
}) => {
  const params = {
    UnaCompania: {
      type: 'IN',
      value: nit_compania,
    },
    UnOpuOrden: {
      type: 'IN',
      value: rowSelected?.nromovdopu ?? 0,
    },
    UnOpuTipo: {
      type: 'IN',
      value: ordenPagoU_tipoContrato,
    },
    UnOpuValor: {
      type: 'IN',
      value: getValues('valor'),
    },
    UnOpuNroContrato: {
      type: 'IN',
      value: ordenPagoU_nroContrato,
    },
    UnOpuTipoContrato: {
      type: 'IN',
      value: ordenPagoU_tipoContrato,
    },
    UnOpuTerAnticipada: {
      type: 'IN',
      value: ordenPagouData?.ter_anticipada ?? 'N',
    },
    UnDopuNroDetalleContrato: {
      type: 'IN',
      value: getValues('nro_detalle_contrato'),
    },
    UnDopuValorTotal: {
      type: 'IN',
      value: valorTotal,
    },
    UnDataBaseValor: {
      type: 'IN',
      value: rowSelected?.valor ?? 0,
    },
    OutValue: {
      type: 'OUT',
    },
    OutStatus: {
      type: 'OUT',
    },
    OutMessage: {
      type: 'OUT',
    },
  }

  const responseValueValidation = await getProcedureResult({
    statement: `BEGIN siif.pkgweb_orden_pago.dordenpagou_valor_validate(
                                                                              :UnaCompania,
                                                                              :UnOpuOrden,
                                                                              :UnOpuTipo,
                                                                              :UnOpuValor,
                                                                              :UnOpuNroContrato,
                                                                              :UnOpuTipoContrato,
                                                                              :UnOpuTerAnticipada,
                                                                              :UnDopuNroDetalleContrato,
                                                                              :UnDopuValorTotal,
                                                                              :UnDataBaseValor,
                                                                              :OutValue,
                                                                              :OutStatus,
                                                                              :OutMessage); END;`,
    params,
  })

  if (responseValueValidation?.data?.outBinds?.OutStatus === 'ERROR') {
    toast.error(
      responseValueValidation?.data?.outBinds?.OutMessage ?? 'Error al realizar pretext item valor'
    )
    return 'No se pudo validar el valor del servicio'
  }
  const outValue = responseValueValidation?.data?.outBinds?.OutValue
  setValue('valor', outValue)

  return true
}

export const valueOnClick = async ({
  rowSelected,
  nit_compania,
  ordenPagoU_tipoContrato,
  ordenPagoU_nroContrato,
  getValues,
  getProcedureResult,
}) => {
  if (!rowSelected?.nromovdopu) {
    const params = {
      UnaCompania: {
        type: 'IN',
        value: nit_compania,
      },
      UnOpuTipo: {
        type: 'IN',
        value: ordenPagoU_tipoContrato,
      },
      UnOpuNroContrato: {
        type: 'IN',
        value: ordenPagoU_nroContrato,
      },
      UnOpuTipoContrato: {
        type: 'IN',
        value: ordenPagoU_tipoContrato,
      },
      UnDopuNroDetalleContrato: {
        type: 'IN',
        value: getValues('nro_detalle_contrato'),
      },
      OutValue: {
        type: 'OUT',
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

    const responsePreTextItem = await getProcedureResult({
      statement: `BEGIN siif.pkgweb_orden_pago.dordenpagou_valor_pretext(
                                                                          :UnaCompania,
                                                                          :UnOpuTipo,
                                                                          :UnOpuNroContrato,
                                                                          :UnOpuTipoContrato,
                                                                          :UnDopuNroDetalleContrato,
                                                                          :OutValue,
                                                                          :OutIva,
                                                                          :OutStatus,
                                                                          :OutMessage); END;`,
      params,
    })

    if (responsePreTextItem?.data?.outBinds?.OutStatus === 'ERROR') {
      toast.error(
        responsePreTextItem?.data?.outBinds?.OutMessage ?? 'Error al realizar pretext item valor'
      )
    }
  }
}

export const onBlurValue = async ({
  nit_compania,
  ordenPagoU_nroContrato,
  ordenPagoU_tipoContrato,
  getValues,
  setValue,
  getQueryResultInputs,
}) => {
  const responseIva = await getQueryResultInputs(`SELECT  NVL(PCT_IVA,0) porcentaje_iva
                                                      FROM	DETALLE_CONTRATO 
                                                      WHERE	nit_compania = ${nit_compania} AND 
                                                        nro_contrato = ${ordenPagoU_nroContrato} AND 
                                                        tipo_contrato = '${ordenPagoU_tipoContrato}' AND 
                                                        nro_detalle_contrato = ${getValues(
                                                          'nro_detalle_contrato'
                                                        )}`)

  const porcentaje_iva = responseIva?.data?.[0]?.porcentaje_iva

  if (responseIva?.data?.outBinds?.OutStatus === 'ERROR') {
    toast.error(
      responseIva?.data?.outBinds?.OutMessage ?? 'Error al realizar post change item valor'
    )
  }

  if (porcentaje_iva && porcentaje_iva !== 0) {
    const iva = Math.round((Number(getValues('valor') ?? 0) * Number(porcentaje_iva)) / 100)
    setValue('iva', iva)
  }
}
