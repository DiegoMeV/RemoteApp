import toast from 'react-hot-toast'
import { typeHandlers } from '../funcs'

const useCommonFuncs = ({
  nit_compania,
  getFormValue,
  ordenPagoData,
  getProcedureResult,
  queryParams,
}) => {
  const commonPostInsert = async () => {
    const convertDate = typeHandlers['date']

    const params = {
      UnaCompania: {
        type: 'IN',
        value: nit_compania,
      },
      UnOpdOrden: {
        type: 'IN',
        value: Number(getFormValue('orden_pago.orden')),
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
      UnOpdPrefijo: {
        type: 'IN',
        value: getFormValue('orden_pago.prefijo')
          ? Number(getFormValue('orden_pago.prefijo'))
          : null,
      },
      UnOpdTercero: {
        type: 'IN',
        value: getFormValue('orden_pago.tercero')
          ? Number(getFormValue('orden_pago.tercero'))
          : null,
      },
      UnOpdTerceroType: {
        type: 'IN',
        value: getFormValue('orden_pago.tercero_type'),
      },
      UnOpdTipo: {
        type: 'IN',
        value: getFormValue('orden_pago.tipo') ?? ordenPagoData?.tipo,
      },
      UnOpdTipoCpto: {
        type: 'IN',
        value: getFormValue('orden_pago.tipo_cpto') ?? ordenPagoData?.tipo_cpto,
      },
      UnOpdConcepto: {
        type: 'IN',
        value: getFormValue('orden_pago.concepto'),
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
      UnOpdEstado: {
        type: 'IN',
        value: getFormValue('orden_pago.estado'),
      },
      UnOpdDevolucionRetenciones: {
        type: 'IN',
        value: getFormValue('orden_pago.devolucion_retenciones') ? 'S' : 'N',
      },
      UnParameterTipoOrden: {
        type: 'IN',
        value: queryParams?.unparametertipoorden ?? null,
      },
      UnDataBaseFecha: {
        type: 'IN',
        value: ordenPagoData?.fecha
          ? convertDate(ordenPagoData?.fecha)
          : convertDate(getFormValue('orden_pago.fecha')),
      },
      UnDataBaseTipoCompcnt: {
        type: 'IN',
        value: ordenPagoData?.tipo_compcnt ?? Number(getFormValue('orden_pago.tipo_compcnt')),
      },
      OutStatus: {
        type: 'OUT',
      },
      OutMessage: {
        type: 'OUT',
      },
    }
    const responsePostInsert = await getProcedureResult({
      params,
      statement: `BEGIN siif.pkgweb_orden_pagod.ordenpagod_general_post_insert(
                                          :UnaCompania,
                                          :UnOpdOrden,
                                          :UnOpdFecha,
                                          :UnOpdTipoCompcnt,
                                          :UnOpdPrefijo,
                                          :UnOpdTercero,
                                          :UnOpdTerceroType,
                                          :UnOpdTipo,
                                          :UnOpdTipoCpto,
                                          :UnOpdConcepto,
                                          :UnOpdCptoCausacion,
                                          :UnOpdCptoAnticipo,
                                          :UnOpdAnticipo,
                                          :UnOpdEstado,
                                          :UnOpdDevolucionRetenciones,
                                          :UnParameterTipoOrden,
                                          :UnDataBaseFecha,
                                          :UnDataBaseTipoCompcnt,
                                          :OutStatus,
                                          :OutMessage);
                                  END;`,
    })

    if (responsePostInsert?.data?.outBinds?.OutStatus === 'ERROR') {
      toast.error(
        responsePostInsert?.data?.outBinds?.OutMessage ?? 'Error al realizar general post insert'
      )
    }
    return responsePostInsert
  }

  const commonPostUpdate = async () => {
    const convertDate = typeHandlers['date']
    const params = {
      UnaCompania: {
        type: 'IN',
        value: nit_compania,
      },
      UnOpdOrden: {
        type: 'IN',
        value: Number(getFormValue('orden_pago.orden')),
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
      UnOpdPrefijo: {
        type: 'IN',
        value: getFormValue('orden_pago.prefijo'),
      },
      UnOpdTercero: {
        type: 'IN',
        value: getFormValue('orden_pago.tercero')
          ? Number(getFormValue('orden_pago.tercero'))
          : null,
      },
      UnOpdTerceroType: {
        type: 'IN',
        value: getFormValue('orden_pago.tercero_type'),
      },
      UnOpdTipo: {
        type: 'IN',
        value: ordenPagoData?.tipo,
      },
      UnOpdTipoCpto: {
        type: 'IN',
        value: getFormValue('orden_pago.tipo_cpto'),
      },
      UnOpdConcepto: {
        type: 'IN',
        value: getFormValue('orden_pago.concepto'),
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
      UnOpdEstado: {
        type: 'IN',
        value: getFormValue('orden_pago.estado'),
      },
      UnOpdDevolucionRetenciones: {
        type: 'IN',
        value: getFormValue('orden_pago.devolucion_retenciones') ? 'S' : 'N',
      },
      UnOpdProceso: {
        type: 'IN',
        value: getFormValue('orden_pago.proceso')
          ? Number(getFormValue('orden_pago.proceso'))
          : null,
      },
      UnParameterTipoOrden: {
        type: 'IN',
        value: queryParams?.unparametertipoorden ?? null,
      },
      UnParameterProcesoOrigen: {
        type: 'IN',
        value: queryParams?.unparameterprocesoorigen
          ? Number(queryParams?.unparameterprocesoorigen)
          : null,
      },
      UnDataBaseFecha: {
        type: 'IN',
        value: convertDate(ordenPagoData?.fecha),
      },
      UnDataBaseTipoCompcnt: {
        type: 'IN',
        value: ordenPagoData?.tipo_compcnt ? Number(ordenPagoData?.tipo_compcnt) : null,
      },
      OutStatus: {
        type: 'OUT',
      },
      OutMessage: {
        type: 'OUT',
      },
    }

    const responsePostUpdate = await getProcedureResult({
      params,
      statement: `BEGIN siif.pkgweb_orden_pagod.ordenpagod_general_post_update(
                                          :UnaCompania,
                                          :UnOpdOrden,
                                          :UnOpdFecha,
                                          :UnOpdTipoCompcnt,
                                          :UnOpdPrefijo,
                                          :UnOpdTercero,
                                          :UnOpdTerceroType,
                                          :UnOpdTipo,
                                          :UnOpdTipoCpto,
                                          :UnOpdConcepto,
                                          :UnOpdCptoCausacion,
                                          :UnOpdCptoAnticipo,
                                          :UnOpdAnticipo,
                                          :UnOpdEstado,
                                          :UnOpdDevolucionRetenciones,
                                          :UnOpdProceso,
                                          :UnParameterTipoOrden,
                                          :UnParameterProcesoOrigen,
                                          :UnDataBaseFecha,	
                                          :UnDataBaseTipoCompcnt,
                                          :OutStatus,
                                          :OutMessage);
                                          END;`,
    })

    if (responsePostUpdate?.data?.outBinds?.OutStatus === 'ERROR') {
      toast.error(
        responsePostUpdate?.data?.outBinds?.OutMessage ?? 'Error al realizar general post insert'
      )
    }
    return responsePostUpdate
  }

  return {
    commonPostInsert,
    commonPostUpdate,
  }
}

export default useCommonFuncs
