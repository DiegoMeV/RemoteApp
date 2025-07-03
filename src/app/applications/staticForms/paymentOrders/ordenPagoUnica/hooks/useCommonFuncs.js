import { typeHandlers } from '../funcs'

const useCommonFuncs = ({
  nit_compania,
  getFormValue,
  depRetFuenteData,
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
      UnOpuOrden: {
        type: 'IN',
        value: Number(getFormValue('orden_pagou.orden')),
      },
      UnOpuTipo: {
        type: 'IN',
        value: getFormValue('orden_pagou.tipo'),
      },
      UnOpuFecha: {
        type: 'IN',
        value: convertDate(getFormValue('orden_pagou.fecha')),
      },
      UnOpuTipoCompcnt: {
        type: 'IN',
        value: getFormValue('orden_pagou.tipo_compcnt'),
      },
      UnOpuConcepto: {
        type: 'IN',
        value: getFormValue('orden_pagou.concepto'),
      },
      UnOpuNroContrato: {
        type: 'IN',
        value: getFormValue('orden_pagou.nro_contrato'),
      },
      UnOpuTipoContrato: {
        type: 'IN',
        value: getFormValue('orden_pagou.tipo_contrato'),
      },
      UnOpuAnticipo: {
        type: 'IN',
        value: getFormValue('orden_pagou.anticipo'),
      },
      UnRecalcularImpuesto: {
        type: 'IN',
        value: getFormValue('orden_pagou.recalcular_impuesto') ? 'S' : 'N',
      },
      UnRtefteValorMes: {
        type: 'IN',
        value: depRetFuenteData?.data?.[0]?.valor_mes || 0,
      },
      UnRtefteImpuestoSolidario: {
        type: 'IN',
        value: depRetFuenteData?.data?.[0]?.impuesto_solidario || 0,
      },
      UnRtefteAporteSolidario: {
        type: 'IN',
        value: depRetFuenteData?.data?.[0]?.aporte_solidario || 0,
      },
      OutStatus: {
        type: 'OUT',
      },
      OutMessage: {
        type: 'OUT',
      },
    }
    return await getProcedureResult({
      params,
      statement: `BEGIN siif.pkgweb_orden_pago.ordenpagou_general_post_insert(
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
                                  :UnRtefteValorMes,
                                  :UnRtefteImpuestoSolidario,
                                  :UnRtefteAporteSolidario,
                                  :OutStatus,
                                  :OutMessage);
                                  END;`,
    })
  }

  const commonPostUpdate = async () => {
    const convertDate = typeHandlers['date']
    const params = {
      UnaCompania: {
        type: 'IN',
        value: nit_compania,
      },
      UnOpuOrden: {
        type: 'IN',
        value: Number(getFormValue('orden_pagou.orden')),
      },
      UnOpuTipo: {
        type: 'IN',
        value: getFormValue('orden_pagou.tipo'),
      },
      UnOpuFecha: {
        type: 'IN',
        value: convertDate(getFormValue('orden_pagou.fecha')),
      },
      UnOpuTipoCompcnt: {
        type: 'IN',
        value: getFormValue('orden_pagou.tipo_compcnt'),
      },
      UnOpuConcepto: {
        type: 'IN',
        value: getFormValue('orden_pagou.concepto'),
      },
      UnOpuNroContrato: {
        type: 'IN',
        value: getFormValue('orden_pagou.nro_contrato'),
      },
      UnOpuTipoContrato: {
        type: 'IN',
        value: getFormValue('orden_pagou.tipo_contrato'),
      },
      UnOpuAnticipo: {
        type: 'IN',
        value: getFormValue('orden_pagou.anticipo'),
      },
      UnRecalcularImpuesto: {
        type: 'IN',
        value: getFormValue('orden_pagou.recalcular_impuesto') ? 'S' : 'N',
      },
      UnRtefteValorMes: {
        type: 'IN',
        value: depRetFuenteData?.data?.[0]?.valor_mes || 0,
      },
      UnRtefteImpuestoSolidario: {
        type: 'IN',
        value: depRetFuenteData?.data?.[0]?.impuesto_solidario || 0,
      },
      UnRtefteAporteSolidario: {
        type: 'IN',
        value: depRetFuenteData?.data?.[0]?.aporte_solidario || 0,
      },
      UnOpuEstado: {
        type: 'IN',
        value: getFormValue('orden_pagou.estado'),
      },
      UnOpuProceso: {
        type: 'IN',
        //Creo que debe obtenerse de los datos iniciales ya que el formularion solo tienen los campos visibles
        value: getFormValue('orde_pagou.proceso') ?? null,
      },
      UnParameterProcesoOrigen: {
        type: 'IN',
        value: queryParams?.unparameterproceso ?? null,
      },
      OutStatus: {
        type: 'OUT',
      },
      OutMessage: {
        type: 'OUT',
      },
    }

    return await getProcedureResult({
      params,
      statement: `BEGIN siif.pkgweb_orden_pago.ordenpagou_general_post_update(
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
                                  :UnOpuEstado,
                                  :UnOpuProceso,
                                  :UnParameterProcesoOrigen,
                                  :UnRtefteValorMes,
                                  :UnRtefteImpuestoSolidario,
                                  :UnRtefteAporteSolidario,
                                  :OutStatus,
                                  :OutMessage);
                                  END;`,
    })
  }

  return {
    commonPostInsert,
    commonPostUpdate,
  }
}

export default useCommonFuncs
