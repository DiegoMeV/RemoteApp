export const onNewRecord = async ({
  globalVariables,
  setFormValue,
  getQueryResult,
  queryParams,
}) => {
  setFormValue('orden_pago.division', globalVariables?.additionalUserInfo?.division)
  setFormValue('orden_pago.tipo_compcnt', 8)
  //EL VALOR DIRECTA ES TEMPORAL
  setFormValue('orden_pago.tipo', queryParams?.untipoorden ?? 'DIRECTA')

  const prefijoResponse = await getQueryResult(`SELECT prefijo FROM documento WHERE documento = 8`)

  const prefijo = prefijoResponse?.data?.[0]?.prefijo
  setFormValue('orden_pago.prefijo', prefijo)
}

export const whenNewFormInstance = ({ queryParams, setBloquearBloques }) => {
  if (queryParams?.unsoloconsulta === 'SI') {
    setBloquearBloques(true)
  }

  // 	IF(Miparametro5 = 'NO')THEN
  // 		SET_ITEM_PROPERTY('orden_pago.COPIARDESC',VISIBLE,PROPERTY_FALSE);
  // 	END IF;

  // 	IF :parameter.untipoorden='CESANTIAS' THEN

  // 		SET_ITEM_PROPERTY('orden_pago.obligacion',VISIBLE,PROPERTY_FALSE);

  // 	ELSE
  // 			SET_ITEM_PROPERTY('orden_pago.dev_retenciones',VISIBLE,PROPERTY_FALSE);
  // 		END IF;
  // 	END IF;

  // /*
  // 	IF :GLOBAL.compania=891480085 THEN
  // 		SET_ITEM_PROPERTY ('ORDEN_PAGO.ID_CENTROCOSTO', required, PROPERTY_TRUE);
  // 	END IF;
  // */

  // 	IF :parameter.unaetapaproceso IS NOT NULL THEN
  // 		:GLOBAL.seimprimio:='N';
  // 	END IF;

  // END;

  // -- Integración SAPP
  // Declare
  // 		MICANT 	NUMBER;
  // Begin

  // 	if :PARAMETER.UNIDPROCESS is not null then
  // 		set_block_property('ORDEN_PAGO', DEFAULT_WHERE,
  // 			'nit_compania = :GLOBAL.COMPANIA '||
  // 			' and id_process = :PARAMETER.UNIDPROCESS '||
  // 			' and estado != '||''''||'A'||''''
  // 		);
  // 		execute_query;
  // 	elsif :PARAMETER.UNAETAPAPROCESO is not null then
  // 		if :PARAMETER.UNPROCESOORIGEN is not null then
  // 			set_block_property('ORDEN_PAGO', DEFAULT_WHERE,
  // 				'nit_compania = :GLOBAL.COMPANIA '||
  // 				' and proceso = :PARAMETER.UNPROCESOORIGEN '
  // 			);
  // 		else
  // 			set_block_property('ORDEN_PAGO', DEFAULT_WHERE,
  // 				'nit_compania = :GLOBAL.COMPANIA '||
  // 				' and proceso = :PARAMETER.UNPROCESO '||
  // 				' and estado != '||''''||'A'||''''
  // 			);
  // 		end if;
  // 		execute_query;
  // 	elsif trunc(sysdate) >= to_date('01012020', 'ddmmyyyy') and :GLOBAL.compania in('890102006','891480085') then

  // 		-- Verifica si el usuario no tiene la restricción
  // 		select count(*)
  // 		into MICANT
  // 		from temp_usuario_gestion
  // 		where usuario = user;

  // 		if MICANT = 0 then
  // 			set_block_property('ORDEN_PAGO', INSERT_ALLOWED, PROPERTY_FALSE);
  // 			message('Advertencia: El registro de órdenes de pago nuevas ha sido restringido a través de esta opción. Para crear nuevos documentos por favor utilice el módulo de procesos ');
  // 			message('Advertencia: El registro de órdenes de pago nuevas ha sido restringido a través de esta opción. Para crear nuevos documentos por favor utilice el módulo de procesos ');
  // 		end if;
  // 	elsif ((trunc(sysdate) >= to_date('03082020', 'ddmmyyyy') and :GLOBAL.compania in('891900272')) or (trunc(sysdate) >= to_date('01012021', 'ddmmyyyy') and :GLOBAL.compania=891900853)) then

  // 		-- Verifica si el usuario no tiene la restricción
  // 		select count(*)
  // 		into MICANT
  // 		from temp_usuario_gestion
  // 		where usuario = user;

  // 		if MICANT = 0 then
  // 			set_block_property('ORDEN_PAGO', INSERT_ALLOWED, PROPERTY_FALSE);
  // 			message('Advertencia: El registro de órdenes de pago nuevas ha sido restringido a través de esta opción. Para crear nuevos documentos por favor utilice el módulo de procesos ');
  // 			message('Advertencia: El registro de órdenes de pago nuevas ha sido restringido a través de esta opción. Para crear nuevos documentos por favor utilice el módulo de procesos ');
  // 		end if;

  // 	end if;
  // end;
}
