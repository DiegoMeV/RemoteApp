import toast from 'react-hot-toast'

const redondeaCienCond = (unvalor) => {
  const mivalor1 = unvalor % 100
  let mivalor2

  if (mivalor1 < 50 && mivalor1 > 0) {
    mivalor2 = Math.round((unvalor + 50) / 100) * 100
  } else {
    mivalor2 = Math.round(unvalor / 100) * 100
  }

  return mivalor2
}

export const onClickPagoARP = async ({
  nit_compania,
  getQueryResult,
  getFormValue,
  watch,
  setValue,
}) => {
  const validationData = await getQueryResult(`SELECT
                                    rp.porcentaje                miporcentaje,
                                    nvl(tc.desc_seg_social, 'N') miaplicadesc
                                FROM
                                    contrato             c,
                                    afiliaciones_tercero ater,
                                    riesgos_arp          rp,
                                    tipo_contrato        tc
                                WHERE
                                        c.nit_compania = ${nit_compania}
                                    AND c.tipo_contrato = '${getFormValue(
                                      'orden_pagou.tipo_contrato'
                                    )}' 
                                    AND c.nro_contrato = ${getFormValue('orden_pagou.nro_contrato')}
                                    AND c.nit_compania = ater.nit_compania
                                    AND c.tercero = ater.tercero
                                    AND c.tercero_type = ater.tercero_type
                                    AND ater.nit_compania = rp.nit_compania
                                    AND ater.riesgo = rp.riesgo
                                    AND c.nit_compania = tc.nit_compania
                                    AND c.tipo_contrato = tc.tipo_contrato`)

  const miporcentaje = validationData?.data?.[0]?.miporcentaje || 0
  const miaplicadesc = validationData?.data?.[0]?.miaplicadesc || 'N'

  if (miaplicadesc === 'S') {
    const base_aportes = Number(watch('base_aportes')) || 0
    setValue('pago_arp', redondeaCienCond((base_aportes * miporcentaje) / 100))
  }
}

export const validatePagoARP = async ({
  value,
  nit_compania,
  getQueryResult,
  getFormValue,
  watch,
  setValue,
}) => {
  const validationData = await getQueryResult(`SELECT
                                    rp.porcentaje                miporcentaje,
                                    nvl(tc.desc_seg_social, 'N') miaplicadesc
                                FROM
                                    contrato             c,
                                    afiliaciones_tercero ater,
                                    riesgos_arp          rp,
                                    tipo_contrato        tc
                                WHERE
                                        c.nit_compania = ${nit_compania}
                                    AND c.tipo_contrato = '${getFormValue(
                                      'orden_pagou.tipo_contrato'
                                    )}' 
                                    AND c.nro_contrato = ${getFormValue('orden_pagou.nro_contrato')}
                                    AND c.nit_compania = ater.nit_compania
                                    AND c.tercero = ater.tercero
                                    AND c.tercero_type = ater.tercero_type
                                    AND ater.nit_compania = rp.nit_compania
                                    AND ater.riesgo = rp.riesgo
                                    AND c.nit_compania = tc.nit_compania
                                    AND c.tipo_contrato = tc.tipo_contrato`)

  const miporcentaje = validationData?.data?.[0]?.miporcentaje || 0
  const miaplicadesc = validationData?.data?.[0]?.miaplicadesc || 'N'

  if (miaplicadesc === 'S') {
    const base_aportes = Number(watch('base_aportes')) || 0
    const redondeado = redondeaCienCond((base_aportes * miporcentaje) / 100)
    if (value < redondeado) {
      toast.error(`El aporte a ARL no puede ser inferior al ${miporcentaje}% del valor del mes`)
      setValue('pago_arp', redondeado)
      return true
    }
  }
}

export const generarRetencion = async ({
  nit_compania,
  globalVariables,
  getFormValue,
  getProcedureResult,
  valores_dorden_pagou,
  getValues,
  setValue,
  setDataToShow,
  onSubmit,
}) => {
  const params = {
    UnaCompania: {
      type: 'IN',
      value: nit_compania,
    },
    UnOpuNroContrato: {
      type: 'IN',
      value: getFormValue('orden_pagou.nro_contrato'),
    },
    UnOpuTipoContrato: {
      type: 'IN',
      value: getFormValue('orden_pagou.tipo_contrato'),
    },
    UnDopuValorTotal: {
      type: 'IN',
      value: valores_dorden_pagou?.subtotalValue1 ?? null,
    },
    UnGlobalMiUvt: {
      type: 'IN',
      value: globalVariables?.miuvt ?? null,
    },
    UnRtefteValorMes: {
      type: 'IN',
      value: getValues('valor_mes') || null,
    },
    OutRtefteValorMes: {
      type: 'OUT',
    },
    UnRtefteImpuestoSolidario: {
      type: 'OUT',
    },
    UnRtefteAporteSolidario: {
      type: 'OUT',
    },
    UnRtefteBaseRetencion: {
      type: 'OUT',
    },
    UnRtefteValorDeducible: {
      type: 'OUT',
    },
    UnRteftePagoPension: {
      type: 'IN',
      value: getValues('pago_pension') || null,
    },
    UnRteftePagoSalud: {
      type: 'IN',
      value: getValues('pago_salud') || null,
    },
    UnRteftePagoArp: {
      type: 'IN',
      value: getValues('pago_arp') || null,
    },
    UnRteftePagoIntVivienda: {
      type: 'IN',
      value: getValues('int_vivienda') || null,
    },
    UnRteftePagoMedPrepagada: {
      type: 'IN',
      value: getValues('med_prepagada') || null,
    },
    UnRteftePagoDependientes: {
      type: 'IN',
      value: getValues('dependientes') || null,
    },
    UnRteftePagoCuentasAfc: {
      type: 'IN',
      value: getValues('cuentas_afc') || null,
    },
    UnRtefteBaseEnUvt: {
      type: 'OUT',
    },
    UnRteftePorcentaje: {
      type: 'OUT',
    },
    UnRtefteBaseRetencionArt1: {
      type: 'OUT',
    },
    UnRtefteTextoArt1: {
      type: 'OUT',
    },
    UnRtefteBaseRetencionArt3: {
      type: 'OUT',
    },
    UnRtefteTextoArt3: {
      type: 'OUT',
    },
    UnRtefteVrRteFte: {
      type: 'OUT',
    },
    UnRtefteVrAplicaArt3: {
      type: 'OUT',
    },
    UnRtefteVrAplicaArt1: {
      type: 'OUT',
    },
    OutStatus: {
      type: 'OUT',
    },
    OutMessage: {
      type: 'OUT',
    },
  }
  const responseGenerarRetencion = await getProcedureResult({
    statement: `BEGIN siif.pkgweb_orden_pago.ordenpagou_calcular_rtefte(
                                                                        :UnaCompania,
                                                                        :UnOpuNroContrato,
                                                                        :UnOpuTipoContrato,
                                                                        :UnDopuValorTotal,
                                                                        :UnGlobalMiUvt,
                                                                        :UnRtefteValorMes,
                                                                        :OutRtefteValorMes,
                                                                        :UnRtefteImpuestoSolidario,
                                                                        :UnRtefteAporteSolidario,
                                                                        :UnRtefteBaseRetencion,
                                                                        :UnRtefteValorDeducible,
                                                                        :UnRteftePagoPension,
                                                                        :UnRteftePagoSalud,
                                                                        :UnRteftePagoArp,
                                                                        :UnRteftePagoIntVivienda,
                                                                        :UnRteftePagoMedPrepagada,
                                                                        :UnRteftePagoDependientes,
                                                                        :UnRteftePagoCuentasAfc,
                                                                        :UnRtefteBaseEnUvt,
                                                                        :UnRteftePorcentaje,
                                                                        :UnRtefteBaseRetencionArt1,
                                                                        :UnRtefteTextoArt1,
                                                                        :UnRtefteBaseRetencionArt3,
                                                                        :UnRtefteTextoArt3,
                                                                        :UnRtefteVrRteFte,
                                                                        :UnRtefteVrAplicaArt3,
                                                                        :UnRtefteVrAplicaArt1,
                                                                        :OutStatus,
                                                                        :OutMessage); END;`,
    params,
  })

  const {
    OutRtefteValorMes,
    UnRtefteImpuestoSolidario,
    UnRtefteAporteSolidario,
    UnRtefteBaseRetencion,
    UnRtefteValorDeducible,
    UnRtefteBaseEnUvt,
    UnRteftePorcentaje,
    UnRtefteBaseRetencionArt1,
    UnRtefteTextoArt1,
    UnRtefteBaseRetencionArt3,
    UnRtefteTextoArt3,
    UnRtefteVrRteFte,
    UnRtefteVrAplicaArt3,
    UnRtefteVrAplicaArt1,
  } = responseGenerarRetencion?.data?.outBinds || {}

  setValue('valor_mes', OutRtefteValorMes || null)
  setValue('impuesto_solidario', UnRtefteImpuestoSolidario || null)
  setValue('aporte_solidario', UnRtefteAporteSolidario || null)
  setValue('base_retencion', UnRtefteBaseRetencion || null)
  setValue('valor_deducible', UnRtefteValorDeducible || null)
  setValue('base_en_uvt', UnRtefteBaseEnUvt || null)
  setValue('porcentaje', UnRteftePorcentaje || null)
  setValue('vr_rte_fte_art1', UnRtefteBaseRetencionArt1 || null)
  setValue('vr_rte_fte_art3', UnRtefteBaseRetencionArt3 || null)
  setValue('vr_rte_fte', UnRtefteVrRteFte || null)
  setValue('aplica_art3', UnRtefteVrAplicaArt3)
  setValue('aplica_art1', UnRtefteVrAplicaArt1)

  setDataToShow({
    texto_art1: UnRtefteTextoArt1,
    texto_art3: UnRtefteTextoArt3,
  })

  if (responseGenerarRetencion?.data?.outBinds?.OutStatus === 'ERROR') {
    toast.error(
      responseGenerarRetencion?.data?.outBinds?.OutMessage ?? 'Error al realizar pretext item valor'
    )
    return 'No se pudo validar el valor del servicio'
  }

  if (['SUCCESS', 'OK'].includes(responseGenerarRetencion?.data?.outBinds?.OutStatus)) {
    onSubmit()
    return true
  }
}
