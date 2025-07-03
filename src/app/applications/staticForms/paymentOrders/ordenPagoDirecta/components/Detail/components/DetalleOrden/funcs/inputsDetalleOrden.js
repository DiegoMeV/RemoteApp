export const inputsEditionDetalleOrden = ({
  setValue,
  nit_compania,
  // getFormValue,
  // getQueryResultInputs,
  // getValues,
  // getProcedureResult,
  // rowSelected,
  // totals,
  ordenPagoData,
  watch,
}) => {
  // const valorTotal = totals?.subtotalValue1 ?? 0
  // const ordenPagoU_tipoContrato = getFormValue('orden_pago.tipo_contrato')
  // const ordenPagoU_nroContrato = getFormValue('orden_pago.nro_contrato')

  const ordenPagoTipoCptoIsGasto = ordenPagoData?.data?.[0]?.tipo_cpto === 'GASTO'

  return [
    {
      name: 'id_centrocosto',
      label: 'Id Centro de costo',
      type: 'textfieldQuery',
      required: true,
      onChange: (_, value) => {
        setValue('id_centrocosto', value?.id_centrocosto)
        setValue('nombre_centro_costo', value?.nombre)
      },
      queryProps: {
        lovQuery: `SELECT
                        id_centrocosto,
                        nombre
                    FROM
                        centrocosto
                    WHERE
                        nit_compania = ${nit_compania}
                    ORDER BY
                        id_centrocosto`,
      },
      tableProps: {
        columns: [
          {
            field: 'id_centrocosto',
            headerName: 'Id Centro de costo',
          },
          {
            field: 'nombre',
            headerName: 'Nombre del centro de costo',
          },
        ],
      },
      className: 'col-span-12',
    },
    {
      name: 'nombre_centro_costo',
      label: 'Nombre del centro de costo',
      InputProps: {
        readOnly: true,
      },
      className: 'col-span-12',
    },
    {
      name: 'tercero',
      label: 'Tercero',
      type: 'textfieldQuery',
      required: true,
      onChange: (_, value) => {
        setValue('tercero', value?.tercero)
        setValue('nombre_tercero', value?.nombre)
        setValue('tercero_type', value?.tipo)
      },
      queryProps: {
        lovQuery: `SELECT
                      tercero,
                      substr(nombre
                            || ' '
                            || apellido_1
                            || ' '
                            || apellido_2, 1, 255) nombre,
                      tercero_type           tipo,
                      dependencia            dependencia
                  FROM
                      tercero
                  WHERE
                          tercero <> 1
                      AND nit_compania = ${nit_compania}
                      AND nvl(activo, 'S') = 'S'
                      AND tercero_type NOT IN ( 'CLIENTE' )
                  ORDER BY
                      2,
                      3`,
      },
      tableProps: {
        columns: [
          {
            field: 'tercero',
            headerName: 'Tercero',
          },
          {
            field: 'nombre',
            headerName: 'Nombre del tercero',
          },
        ],
      },
      className: 'col-span-12',
    },
    {
      name: 'nombre_tercero',
      label: 'Nombre del tercero',
      InputProps: {
        readOnly: true,
      },
      className: 'col-span-12',
    },
    {
      name: 'tercero_type',
      label: 'Tipo de tercero',
      disabled: true,
      className: 'col-span-12',
    },
    {
      name: 'grupo',
      label: 'Nat. Gasto',
      type: 'textfieldQuery',
      required: true,
      onChange: (_, value) => {
        setValue('grupo', value?.grupo)
      },
      queryProps: {
        lovQuery: `SELECT
                      grupos_por_cc.grupo,
                      grupos_de_centros.nombre
                  FROM
                      grupos_por_cc,
                      grupos_de_centros
                  WHERE
                          grupos_por_cc.grupo = grupos_de_centros.grupo
                      AND grupos_por_cc.id_centrocosto = ${watch('id_centrocosto')}
                      AND grupos_por_cc.nit_compania = ${nit_compania}
                      AND grupos_de_centros.nit_compania = ${nit_compania}`,
      },
      tableProps: {
        columns: [
          {
            field: 'grupo',
            headerName: 'Grupo',
          },
          {
            field: 'nombre',
            headerName: 'Nombre del grupo',
          },
        ],
      },
      className: 'col-span-12',
    },
    {
      name: 'cpto_gasto',
      label: 'Concepto de gasto',
      type: 'textfieldQuery',
      onChange: (_, value) => {
        setValue('cpto_gasto', value?.cpto_gasto)
        setValue('nombre_cpto_gasto', value?.nombre)
      },
      queryProps: {
        lovQuery: `SELECT
                        cpto_gasto.cpto_gasto,
                        cpto_gasto.nombre
                    FROM
                        cpto_gasto,
                        cuentas_cpto_gasto
                    WHERE
                            cpto_gasto.nit_compania = ${nit_compania}
                        AND cpto_gasto.nit_compania = cuentas_cpto_gasto.nit_compania
                        AND cpto_gasto.cpto_gasto = cuentas_cpto_gasto.cpto_gasto
                        AND cuentas_cpto_gasto.grupo = '${watch('grupo')}'
                    ORDER BY
                        1`,
      },
      tableProps: {
        columns: [
          {
            field: 'cpto_gasto',
            headerName: 'Concepto de gasto',
          },
          {
            field: 'nombre',
            headerName: 'Nombre del concepto de gasto',
          },
        ],
      },
      className: !ordenPagoTipoCptoIsGasto ? 'hidden' : 'col-span-12',
    },
    {
      name: 'id_conceptocaja',
      label: 'Id concepto de caja',
      type: 'textfieldQuery',
      onChange: (_, value) => {
        setValue('id_conceptocaja', value?.id_conceptocaja)
        setValue('nombre_cpto_gasto', value?.concepto)
      },
      queryProps: {
        lovQuery: `SELECT
                        id_conceptocaja,
                        nombre
                    FROM
                        conceptocaja
                    WHERE
                            nit_compania = ${nit_compania}
                        AND tipo IN ( 'E' )
                    ORDER BY
                        1`,
      },
      tableProps: {
        columns: [
          {
            field: 'id_conceptocaja',
            headerName: 'Id concepto de caja',
          },
          {
            field: 'nombre',
            headerName: 'Nombre del concepto de caja',
          },
        ],
      },
      className: ordenPagoTipoCptoIsGasto ? 'hidden' : 'col-span-12',
    },
    {
      name: 'nombre_cpto_gasto',
      label: 'Nombre concepto de gasto',
      InputProps: {
        readOnly: true,
      },
      className: 'col-span-12',
    },
    {
      name: 'valor',
      label: 'Valor del servicio',
      type: 'money',
      required: true,
      // validate: async () => {
      //   return await valorValidation({
      //     getValues,
      //     setValue,
      //     nit_compania,
      //     ordenPagouData,
      //     rowSelected,
      //     ordenPagoU_nroContrato,
      //     ordenPagoU_tipoContrato,
      //     getProcedureResult,
      //     valorTotal,
      //   })
      // },
      // onClick: async () => {
      //   await valueOnClick({
      //     rowSelected,
      //     nit_compania,
      //     ordenPagoU_tipoContrato,
      //     ordenPagoU_nroContrato,
      //     getValues,
      //     getProcedureResult,
      //   })
      // },
      // onBlur: async () => {
      //   await onBlurValue({
      //     nit_compania,
      //     ordenPagoU_nroContrato,
      //     ordenPagoU_tipoContrato,
      //     getValues,
      //     setValue,
      //     getQueryResultInputs,
      //   })
      // },
      className: 'col-span-12',
    },
    {
      name: 'iva',
      label: 'IVA del servicio',
      type: 'money',
      // validate: async () => {
      //   return await ivaValidation({
      //     getFormValue,
      //     getValues,
      //     setValue,
      //     nit_compania,
      //     ordenPagouData,
      //     rowSelected,
      //     ordenPagoU_nroContrato,
      //     ordenPagoU_tipoContrato,
      //     getProcedureResult,
      //   })
      // },
      className: 'col-span-12',
    },
  ]
}
