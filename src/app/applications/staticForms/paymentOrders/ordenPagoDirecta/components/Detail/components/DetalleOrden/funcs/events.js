import { typeHandlers } from '../../../../../funcs'

export const postDelete = async ({
  nit_compania,
  getFormValue,
  data,
  getProcedureResult,
  queryParams,
  ordenPagoData,
}) => {
  const convertDate = typeHandlers['date']

  const dataBase = ordenPagoData?.data?.[0]

  const params = {
    UnaCompania: {
      type: 'IN',
      value: nit_compania,
    },
    UnOpdOrden: {
      type: 'IN',
      value: Number(data?.orden),
    },
    UnOpdFecha: {
      type: 'IN',
      value: convertDate(getFormValue('orden_pago.fecha')),
    },
    UnOpdTipoCompcnt: {
      type: 'IN',
      value: getFormValue('orden_pago.tipo_compcnt')
        ? Number(getFormValue('orden_pago.tipo_compcnt'))
        : null,
    },
    UnOpdTercero: {
      type: 'IN',
      value: getFormValue('orden_pago.tercero') ? getFormValue('orden_pago.tercero') : null,
    },
    UnOpdTerceroType: {
      type: 'IN',
      value: getFormValue('orden_pago.tercero_type') ?? null,
    },
    UnOpdCptoCausacion: {
      type: 'IN',
      value: getFormValue('orden_pago.cpto_causacion')
        ? Number(getFormValue('orden_pago.cpto_causacion'))
        : null,
    },
    UnOpdCptoAnticipo: {
      type: 'IN',
      value: getFormValue('orden_pago.cpto_anticipo')
        ? Number(getFormValue('orden_pago.cpto_anticipo'))
        : null,
    },
    UnOpdAnticipo: {
      type: 'IN',
      value: getFormValue('orden_pago.anticipo')
        ? Number(getFormValue('orden_pago.anticipo'))
        : null,
    },
    UnOpdTipoCpto: {
      type: 'IN',
      value: getFormValue('orden_pago.tipo_cpto') ?? null,
    },
    UnOpdConcepto: {
      type: 'IN',
      value: getFormValue('orden_pago.concepto') ?? null,
    },
    UnOpdEstado: {
      type: 'IN',
      value: getFormValue('orden_pago.estado') ?? null,
    },
    UnParameterTipoOrden: {
      type: 'IN',
      value: queryParams?.unparametertipoorden ?? null,
    },
    UnDataBaseFecha: {
      type: 'IN',
      value: dataBase?.fecha ? convertDate(dataBase?.fecha) : null,
    },
    UnDataBaseTipoCompcnt: {
      type: 'IN',
      value: dataBase?.tipo_compcnt ? Number(dataBase?.tipo_compcnt) : null,
    },
    OutStatus: {
      type: 'OUT',
    },
    OutMessage: {
      type: 'OUT',
    },
  }

  const resultProcedure = await getProcedureResult({
    statement: `BEGIN siif.pkgweb_orden_pagod.ordenpagod_post_delete(
                                                        :UnaCompania,
                                                        :UnOpdOrden,
                                                        :UnOpdFecha,
                                                        :UnOpdTipoCompcnt,
                                                        :UnOpdTercero,
                                                        :UnOpdTerceroType,
                                                        :UnOpdCptoCausacion,
                                                        :UnOpdCptoAnticipo,
                                                        :UnOpdAnticipo,
                                                        :UnOpdTipoCpto,
                                                        :UnOpdConcepto,
                                                        :UnOpdEstado,
                                                        :UnParameterTipoOrden,
                                                        :UnDataBaseFecha,	
                                                        :UnDataBaseTipoCompcnt,
                                                        :OutStatus,
                                                        :OutMessage); 
                                                        END;`,
    params,
  })
  return resultProcedure
}
