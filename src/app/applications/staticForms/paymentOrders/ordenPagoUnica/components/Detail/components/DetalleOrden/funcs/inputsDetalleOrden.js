import { ivaValidation, onBlurValue, valorValidation, valueOnClick } from './inputEvents'

export const inputsEditionDetalleOrden = ({
  setValue,
  nit_compania,
  getFormValue,
  getQueryResultInputs,
  getValues,
  getProcedureResult,
  rowSelected,
  totals,
  ordenPagouData,
}) => {
  const valorTotal = totals?.subtotalValue1 ?? 0
  const ordenPagoU_tipoContrato = getFormValue('orden_pagou.tipo_contrato')
  const ordenPagoU_nroContrato = getFormValue('orden_pagou.nro_contrato')

  return [
    {
      name: 'nro_detalle_contrato',
      label: 'Número de servicio',
      type: 'textfieldQuery',
      required: true,
      onChange: (_, value) => {
        setValue('nro_detalle_contrato', value?.nro_detalle_contrato)
        setValue('desc_detalle_contrato', value?.descripcion)
        setValue('valor', value?.valor)
        setValue('iva', value?.iva)
        setValue('cpto_gasto', value?.cpto_gasto)
        setValue('nombre_cpto_gasto', value?.nombre_cpto_gasto)
      },
      queryProps: {
        lovQuery: `SELECT dc.nro_detalle_contrato,  
                  dc.descripcion, 
                  dc.valor, 
                  dc.iva, 
                  dc.GRUPO, 
                  dc.cpto_gasto, 
                  cg.nombre nombre_cpto_gasto
                  FROM detalle_contrato dc, CPTO_GASTO cg
                  WHERE 
                    dc.tipo_contrato = '${ordenPagoU_tipoContrato}' 
                    AND dc.nro_contrato = ${ordenPagoU_nroContrato}  
                    AND dc.nit_compania = ${nit_compania}
                    AND dc.activo= 'N' 
                    AND dc.nit_compania = cg.nit_compania
                    AND dc.CPTO_GASTO = cg.CPTO_GASTO
                  order by 1`,
      },
      tableProps: {
        columns: [
          { field: 'nro_detalle_contrato', headerName: 'Número de servicio', minWidth: 200 },
          { field: 'descripcion', headerName: 'Descripción', width: 400 },
          { field: 'valor', headerName: 'Valor del servicio', type: 'number' },
          { field: 'iva', headerName: 'IVA del servicio', type: 'number' },
          { field: 'cpto_gasto', headerName: 'Número de concepto de gasto' },
          { field: 'nombre_cpto_gasto', headerName: 'Concepto de gasto' },
        ],
      },
      className: 'col-span-4',
    },
    {
      name: 'desc_detalle_contrato',
      label: 'Servicio',
      multiline: true,
      minRows: 3,
      InputProps: {
        readOnly: true,
      },
      className: 'col-span-12',
    },
    {
      name: 'cpto_gasto',
      label: 'Número de concepto de gasto',
      type: 'textfieldQuery',
      required: true,
      onChange: (_, value) => {
        setValue('cpto_gasto', value?.cpto_gasto)
        setValue('nombre_cpto_gasto', value?.nombre)
      },
      queryProps: {
        lovQuery: `SELECT cpto_gasto, nombre FROM cpto_gasto WHERE nit_compania = ${nit_compania} ORDER BY 1`,
      },
      tableProps: {
        columns: [
          {
            field: 'cpto_gasto',
            headerName: 'Número de concepto de gasto',
          },
          {
            field: 'nombre',
            headerName: 'Concepto de gasto',
          },
        ],
      },
      className: 'col-span-12',
    },
    {
      name: 'nombre_cpto_gasto',
      label: 'Concepto de gasto',
      InputProps: {
        readOnly: true,
      },
      className: 'col-span-12',
    },
    {
      name: 'valor',
      label: 'Valor del servicio',
      type: 'money',
      validate: async () => {
        return await valorValidation({
          getValues,
          setValue,
          nit_compania,
          ordenPagouData,
          rowSelected,
          ordenPagoU_nroContrato,
          ordenPagoU_tipoContrato,
          getProcedureResult,
          valorTotal,
        })
      },
      onClick: async () => {
        await valueOnClick({
          rowSelected,
          nit_compania,
          ordenPagoU_tipoContrato,
          ordenPagoU_nroContrato,
          getValues,
          getProcedureResult,
        })
      },
      onBlur: async () => {
        await onBlurValue({
          nit_compania,
          ordenPagoU_nroContrato,
          ordenPagoU_tipoContrato,
          getValues,
          setValue,
          getQueryResultInputs,
        })
      },
      className: 'col-span-12',
    },
    {
      name: 'iva',
      label: 'IVA del servicio',
      type: 'money',
      validate: async () => {
        return await ivaValidation({
          getFormValue,
          getValues,
          setValue,
          nit_compania,
          ordenPagouData,
          rowSelected,
          ordenPagoU_nroContrato,
          ordenPagoU_tipoContrato,
          getProcedureResult,
        })
      },
      className: 'col-span-12',
    },
  ]
}
