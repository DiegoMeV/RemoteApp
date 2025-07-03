import toast from 'react-hot-toast'
import { typeHandlers } from '../../../funcs'

export const onNewRecord = async ({
  globalVariables,
  setFormValue,
  getQueryResult,
  getFunctionResult,
  nit_compania,
  setNewGlobalVariables,
}) => {
  setFormValue('orden_pagou.division', globalVariables?.additionalUserInfo?.division)
  setFormValue('orden_pagou.tipo_compcnt', 8)
  setFormValue('orden_pagou.clase_pago', 'TESORERIA')
  setNewGlobalVariables({
    bloquearent: 'N',
  })

  const prefijoResponse = await getQueryResult(`SELECT prefijo FROM documento WHERE documento = 8`)

  const prefijo = prefijoResponse?.data?.[0]?.prefijo
  setFormValue('orden_pagou.prefijo', prefijo)

  const responseMiAplicaNum = await getFunctionResult({
    packageName: 'und_commom',
    functionName: 'valorparametro',
    params: {
      UNPARAMETRO: 'NUMERACION AUTOMATICA FACTURA EQUIVALENTE',
      UNACOMPANIA: nit_compania,
    },
  })

  const MiAplicaNum = responseMiAplicaNum?.data

  if (MiAplicaNum === 'SI') {
    const responseMiPrefijo = await getFunctionResult({
      packageName: 'und_commom',
      functionName: 'valorparametro',
      params: {
        UNPARAMETRO: 'PREFIJO PARA CONSECUTIVO FACTURA EQUIVALENTE',
        UNACOMPANIA: nit_compania,
      },
    })
    const MiPrefijo = responseMiPrefijo?.data
    setFormValue('orden_pagou.prefijo_num_fe', MiPrefijo)
    setFormValue('orden_pagou.aplica_num_fe', 'S')
  } else {
    setFormValue('orden_pagou.aplica_num_fe', 'N')
  }
}

export const whenNewFormInstance = ({ setNewGlobalVariables, queryParams, setBloquearBloques }) => {
  if (queryParams?.unsoloconsulta === 'SI') {
    setBloquearBloques(true)
  }

  // IF :GLOBAL.compania!=891901109 THEN
  // 	SET_ITEM_PROPERTY('ORDEN_PAGOU.DOC_ANTERIOR',VISIBLE,PROPERTY_FALSE);
  // END IF;

  if (queryParams?.unaetapaproceso || queryParams?.unidactivity) {
    setNewGlobalVariables({
      seimprimio: 'N',
    })
  }

  // IF :GLOBAL.COMPANIA not in('890102006','8901020061','8901020062') THEN --gobatl
  // 	SET_ITEM_PROPERTY('ORDEN_PAGOU.SIN_SITUACION',VISIBLE,PROPERTY_FALSE);
  // END IF;

  // IF :GLOBAL.COMPANIA!=800099310 THEN --D/DAS si no es dosquebradas
  // 	SET_ITEM_PROPERTY('ORDEN_PAGOU.DOC_DDAS',VISIBLE,PROPERTY_FALSE);
  // 	SET_ITEM_PROPERTY('ORDEN_PAGOU.DOC_DDAS',REQUIRED,PROPERTY_FALSE);
  // 	SET_ITEM_PROPERTY('ORDEN_PAGOU.NRO_DDAS',VISIBLE,PROPERTY_FALSE);
  // END IF;

  // 	if :PARAMETER.UNAETAPAPROCESO is not null or :PARAMETER.UNIDPROCESS is not null then
  // 		if :PARAMETER.UNPROCESOORIGEN is not null then
  // 			set_block_property('ORDEN_PAGOU', DEFAULT_WHERE,
  // 				'nit_compania = :GLOBAL.COMPANIA '||
  // 				' and proceso = :PARAMETER.UNPROCESOORIGEN '
  // 			);
  // 		elsif :PARAMETER.UNIDPROCESS is not null then
  // 			set_block_property('ORDEN_PAGOU', DEFAULT_WHERE,
  // 				'nit_compania = :GLOBAL.COMPANIA '||
  // 				' and id_process = :PARAMETER.UNIDPROCESS '
  // 			);
  // 		else
  // 			set_block_property('ORDEN_PAGOU', DEFAULT_WHERE,
  // 				'nit_compania = :GLOBAL.COMPANIA '||
  // 				' and proceso = :PARAMETER.UNPROCESO '||
  // 				' and estado != '||''''||'A'||''''
  // 			);
  // 		end if;
  // 		execute_query;

  // 	elsif trunc(sysdate) >= to_date('01012020', 'ddmmyyyy') and :GLOBAL.compania in('890102006','891480085')  then

  // 		-- Verifica si el usuario no tiene la restricción
  // 		select count(*)
  // 		into MICANT
  // 		from temp_usuario_gestion
  // 		where usuario = :GLOBAL.USUARIO;

  // 		if MICANT = 0 then
  // 			set_block_property('ORDEN_PAGOU', INSERT_ALLOWED, PROPERTY_FALSE);
  // 			message('Advertencia: El registro de órdenes de pago nuevas ha sido restringido a través de esta opción. Para crear nuevos documentos por favor utilice el módulo Precontractual ');
  // 			message('Advertencia: El registro de órdenes de pago nuevas ha sido restringido a través de esta opción. Para crear nuevos documentos por favor utilice el módulo Precontractual ');
  // 		end if;
  // 	elsif ((trunc(sysdate) >= to_date('03082020', 'ddmmyyyy') and :GLOBAL.compania in('891900272')) or (trunc(sysdate) >= to_date('01012021', 'ddmmyyyy') and :GLOBAL.compania=891900853))  then

  // 		-- Verifica si el usuario no tiene la restricción
  // 		select count(*)
  // 		into MICANT
  // 		from temp_usuario_gestion
  // 		where usuario = :GLOBAL.USUARIO;

  // 		if MICANT = 0 then
  // 			set_block_property('ORDEN_PAGOU', INSERT_ALLOWED, PROPERTY_FALSE);
  // 			message('Advertencia: El registro de órdenes de pago nuevas ha sido restringido a través de esta opción. Para crear nuevos documentos por favor utilice el módulo de procesos ');
  // 			message('Advertencia: El registro de órdenes de pago nuevas ha sido restringido a través de esta opción. Para crear nuevos documentos por favor utilice el módulo de procesos ');
  // 		end if;

  // 	end if;
  // end;

  // Declare
  // 	MiPrefijo varchar2(20);
  // 	MiAplicaNUm varchar2(10);
  // begin
  // 	MiAplicaNum := und_commom.valorparametro('NUMERACION AUTOMATICA FACTURA EQUIVALENTE',:GLOBAL.COMPANIA);
  // 	If nvl(MiAplicaNum,'NO') = 'SI' then
  // 		--:global.prefijo_num_fe := und_commom.valorparametro('PREFIJO PARA CONSECUTIVO FACTURA EQUIVALENTE',:GLOBAL.COMPANIA);
  // 		SET_ITEM_PROPERTY('ORDEN_PAGOU.PREFIJO_NUM_FE',VISIBLE,PROPERTY_TRUE);
  // 		--HabilitarItem('ACTA_RECIBO.PREFIJO_NUM_FE');
  // 		SET_ITEM_PROPERTY('ORDEN_PAGOU.CONSECUTIVO_NUM_FE',VISIBLE,PROPERTY_TRUE);
  // 		--HabilitarItem('ACTA_RECIBO.CONSECUTIVO_NUM_FE');
  // 		SET_ITEM_PROPERTY('ORDEN_PAGOU.APLICA_NUM_FE',VISIBLE,PROPERTY_TRUE);
  // 	--	HabilitarItem('ACTA_RECIBO.APLICA_NUM_FE');
  // 	--else
  // 	--	:global.prefijo_num_fe := null;
  // 	End If;
  // end;

  // DECLARE
  // 	MiParametroPeriodoPago VARCHAR2(3);
  // BEGIN
  // 	--JSRIVERA 2024 Activación ventana periodos de pago
  // 	MiParametroPeriodoPago :=	und_commom.valorparametro('ACTIVAR PERIODOS DE PAGO CONTRATO - ACTA RECIBO',:global.compania);

  // 	--JSRIVERA 2024 Activación ventana periodos de pago
  // 	IF MiParametroPeriodoPago = 'NO' THEN
  // 		SET_ITEM_PROPERTY ('ORDEN_PAGOU.ID_PERIODO', visible, PROPERTY_FALSE);
  // 		SET_ITEM_PROPERTY ('ORDEN_PAGOU.FECHA_INI_PER', visible, PROPERTY_FALSE);
  // 		SET_ITEM_PROPERTY ('ORDEN_PAGOU.FECHA_FIN_PER', visible, PROPERTY_FALSE);
  // 	END IF;
  // END;

  // IF :GLOBAL.REQ_UNIDAD_NEGOCIO='N' THEN
  // 	SET_ITEM_PROPERTY('ORDEN_PAGOU.UNIDAD_NEGOCIO',VISIBLE,PROPERTY_FALSE);
  // 	SET_ITEM_PROPERTY('ORDEN_PAGOU.NOMBRE_UNI_NEG',VISIBLE,PROPERTY_FALSE);
  // ELSE
  // 	SET_ITEM_PROPERTY('ORDEN_PAGOU.UNIDAD_NEGOCIO',REQUIRED,PROPERTY_TRUE);
  // END IF;
}

export const postInsert = async ({ nit_compania, data, getProcedureResult }) => {
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
    UnOpuPrefijo: {
      type: 'IN',
      value: data?.prefijo ?? null,
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
    UnOpuNroContrato: {
      type: 'IN',
      value: data?.nro_contrato ?? null,
    },
    UnOpuTipoContrato: {
      type: 'IN',
      value: data?.tipo_contrato ?? null,
    },
    UnOpuIdCentrocosto: {
      type: 'IN',
      value: data?.id_centrocosto ?? null,
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
      'BEGIN siif.pkgweb_orden_pago.ordenpagou_post_insert(:UnaCompania,:UnOpuOrden,:UnOpuTipo,:UnOpuFecha,:UnOpuTipoCompcnt,:UnOpuPrefijo,:UnOpuConcepto,:UnOpuTercero,:UnOpuTerceroType,:UnOpuValor,:UnOpuNroContrato,:UnOpuTipoContrato,:UnOpuIdCentrocosto,:UnRecalcularImpuesto,:OutStatus,:OutMessage); END;',
    params,
  })
  return resultProcedure
}

export const postUpdate = async ({ nit_compania, queryParamsPks, data, getProcedureResult }) => {
  const convertDate = typeHandlers['date']

  const params = {
    UnaCompania: {
      type: 'IN',
      value: nit_compania,
    },
    UnOpuOrden: {
      type: 'IN',
      value: Number(queryParamsPks?.orden),
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
    UnOpuPrefijo: {
      type: 'IN',
      value: data?.prefijo ?? null,
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
    UnOpuIdCentrocosto: {
      type: 'IN',
      value: data?.id_centrocosto ?? null,
    },
    UnOpuAnticipo: {
      type: 'IN',
      value: data?.anticipo ?? null,
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
    UnOpuEstado: {
      type: 'IN',
      value: data?.estado ?? null,
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
      'BEGIN siif.pkgweb_orden_pago.ordenpagou_post_update(:UnaCompania,:UnOpuOrden,:UnOpuTipo,:UnOpuFecha,:UnOpuTipoCompcnt,:UnOpuPrefijo,:UnOpuConcepto,:UnOpuTercero,:UnOpuTerceroType,:UnOpuValor,:UnOpuIva,:UnOpuNroContrato,:UnOpuTipoContrato,:UnOpuIdCentrocosto,:UnOpuAnticipo,:UnOpuNroLegalizacion,:UnOpuNroComprobanteAlm,:UnOpuTipoComprobanteAlm,:UnRecalcularImpuesto,:UnOpuEstado,:OutStatus,:OutMessage); END;',
    params,
  })

  if (resultProcedure?.data?.outBinds?.OutStatus === 'ERROR') {
    toast.error(`${resultProcedure?.data?.outBinds?.OutMessage}`)
    return
  }
}

export const whenValidate = async ({
  nit_compania,
  queryParamsPks,
  validationData,
  queryParams,
  depRetFuenteData,
  getProcedureResult,
}) => {
  const convertDate = typeHandlers['date']

  const params = {
    UnaCompania: {
      type: 'IN',
      value: nit_compania,
    },
    UnOpuOrden: {
      type: 'IN',
      value: Number(queryParamsPks?.orden),
    },
    UnOpuTipo: {
      type: 'IN',
      value: validationData?.tipo,
    },
    UnOpuFecha: {
      type: 'IN',
      value: convertDate(validationData?.fecha),
    },
    UnOpuTipoCompcnt: {
      type: 'IN',
      value: validationData?.tipo_compcnt,
    },
    UnOpuPrefijo: {
      type: 'IN',
      value: validationData?.prefijo,
    },
    UnOpuTercero: {
      type: 'IN',
      value: validationData?.tercero,
    },
    UnOpuTerceroType: {
      type: 'IN',
      value: validationData?.tercero_type,
    },
    UnOpuNroContrato: {
      type: 'IN',
      value: validationData?.nro_contrato ?? null,
    },
    UnOpuTipoContrato: {
      type: 'IN',
      value: validationData?.tipo_contrato ?? null,
    },
    UnOpuEstado: {
      type: 'IN',
      value: validationData?.estado,
    },
    UnOpuNroComprobanteAlm: {
      type: 'IN',
      value: validationData?.nro_comprobante_alm ?? null,
    },
    UnOpuTipoComprobanteAlm: {
      type: 'IN',
      value: validationData?.tipo_comprobante_alm ?? null,
    },
    UnParameterProcesoOrigen: {
      type: 'IN',
      value: queryParams?.proceso_origen ?? null,
    },
    UnRtefteValorMes: {
      type: 'IN',
      value: depRetFuenteData?.data?.[0]?.valor_mes,
    },
    UnRtefteImpuestoSolidario: {
      type: 'IN',
      value: depRetFuenteData?.data?.[0]?.impuesto_solidario,
    },
    UnRtefteAporteSolidario: {
      type: 'IN',
      value: depRetFuenteData?.data?.[0]?.aporte_solidario,
    },
    UnRecordStatus: {
      type: 'IN',
      value: !queryParamsPks?.orden ? 'NEW' : '',
    },
    OutStatus: {
      type: 'OUT',
    },
    OutMessage: {
      type: 'OUT',
    },
  }

  const resultProcedure = await getProcedureResult({
    statement: `BEGIN siif.pkgweb_orden_pago.ordenpagou_when_validate(
                                                  :UnaCompania,
                                                  :UnOpuOrden,
                                                  :UnOpuTipo,
                                                  :UnOpuFecha,
                                                  :UnOpuTipoCompcnt,
                                                  :UnOpuPrefijo,
                                                  :UnOpuTercero,
                                                  :UnOpuTerceroType,
                                                  :UnOpuNroContrato,
                                                  :UnOpuTipoContrato,
                                                  :UnOpuEstado,
                                                  :UnOpuNroComprobanteAlm,
                                                  :UnOpuTipoComprobanteAlm,
                                                  :UnParameterProcesoOrigen,
                                                  :UnRtefteValorMes,
                                                  :UnRtefteImpuestoSolidario,
                                                  :UnRtefteAporteSolidario,
                                                  :UnRecordStatus,
                                                  :OutStatus,
                                                  :OutMessage); END;`,
    params,
  })
  return resultProcedure
}
