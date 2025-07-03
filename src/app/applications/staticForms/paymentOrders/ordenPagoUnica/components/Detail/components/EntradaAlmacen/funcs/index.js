import { formatColombianMoney } from '@/libV4'
import { DeleteOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export * from './entradaAlmacenQuerys'
export * from './utils'
export * from './columns'

export const entradaAlmacenColumns = ({ handleDelete }) => [
  {
    field: 'nrodoc',
    headerName: 'Número de entrada',
    minWidth: 200,
  },
  {
    field: 'desc_entrada_alm',
    headerName: 'Descripción de entrada',
    minWidth: 200,
  },
  {
    field: 'valor',
    headerName: 'Valor de entrada',
    minWidth: 150,
    type: 'number',
    renderCell: (params) => formatColombianMoney(params?.valor ?? ''),
  },
  {
    field: 'iva',
    headerName: 'IVA de entrada',
    minWidth: 150,
    type: 'number',
    renderCell: (params) => formatColombianMoney(params?.iva ?? ''),
  },
  {
    field: 'options',
    headerName: '',
    width: 90,
    pinned: 'right',
    renderCell: (params) => {
      return (
        <IconButton onClick={() => handleDelete(params)}>
          <DeleteOutlined />
        </IconButton>
      )
    },
  },
]

export const inputsEntradaAlmacen = ({ setValue, nit_compania, getFormValue }) => [
  {
    name: 'nrodoc',
    label: 'Número de Entrada',
    type: 'textfieldQuery',
    onChange: (_, value) => {
      setValue('nrodoc', value?.nrodoc)
      setValue('tipo_comprobante_alm', value?.tipo_comprobante_alm)
      setValue('nro_comprobantealm', value?.nro_comprobantealm)
      setValue('desc_entrada_alm', value?.observaciones)
      setValue('valor', value?.valor)
      setValue('iva', value?.iva)
    },
    queryProps: {
      lovQuery: `SELECT 	
              comprobante_alm.NRODOC,
              comprobante_alm.tipo_comprobante_alm, 
              comprobante_alm.nro_comprobantealm,
              comprobante_alm.observaciones,
              sum(NVL(movimiento_alm.cantidad,0)*NVL(movimiento_alm.costo_unit,0))-sum(NVL(movimiento_alm.iva,0)) valor,
              sum(NVL(movimiento_alm.iva,0)) iva
              FROM 	
              comprobante_alm, 
              TIPO_COMPROBANTE_ALM,
              movimiento_alm
              WHERE 	comprobante_alm.nit_compania = ${nit_compania} AND 
              comprobante_alm.nit_compania=tipo_comprobante_alm.nit_compania and
              comprobante_alm.tipo_comprobante_alm = tipo_comprobante_alm.tipo_comprobante_alm AND 					
              tipo_comprobante_alm.clasemovalm IN('ENTRADA_GENERAL','ENTRADA_COMPRA') AND 			
              comprobante_alm.tipo_contrato = '${getFormValue('orden_pagou.tipo_contrato')}' AND 	
              comprobante_alm.nro_contrato = 	${getFormValue('orden_pagou.nro_contrato')} and
              comprobante_alm.estado!='A' and
              comprobante_alm.nit_compania=movimiento_alm.nit_compania and
              comprobante_alm.tipo_comprobante_alm=movimiento_alm.tipo_comprobante_alm and
              comprobante_alm.nro_comprobantealm=movimiento_alm.nro_comprobantealm and
              NOT EXISTS(
              SELECT 
              EO.nro_comprobantealm
              FROM ENTRADAS_ORDENU EO,ORDEN_PAGOU OP
              WHERE EO.NRO_comprobantealm=comprobante_alm.nro_comprobantealm AND 
              EO.NIT_COMPANIA=comprobante_alm.NIT_COMPANIA AND
              EO.TIPO_COMPROBANTE_ALM=comprobante_alm.TIPO_COMPROBANTE_ALM AND
              EO.NIT_COMPANIA=OP.NIT_COMPANIA AND
              EO.ORDEN=OP.ORDEN AND
              OP.ESTADO!='A'
              )
              group by comprobante_alm.NRODOC,
              comprobante_alm.tipo_comprobante_alm, 
              comprobante_alm.nro_comprobantealm,
              comprobante_alm.observaciones`,
    },
    tableProps: {
      columns: [
        {
          field: 'nrodoc',
          headerName: 'Número de entrada',
          minWidth: 200,
        },
        {
          field: 'tipo_comprobante_alm',
          headerName: 'Tipo de comprobante',
          minWidth: 200,
        },
        {
          field: 'nro_comprobantealm',
          headerName: 'Número de comprobante',
          minWidth: 200,
        },
        {
          field: 'observaciones',
          headerName: 'Descripción de entrada',
          minWidth: 200,
        },
        {
          field: 'valor',
          headerName: 'Valor',
          width: 150,
          pinned: 'right',
          renderCell: (params) => formatColombianMoney(params?.valor ?? ''),
        },
        {
          field: 'iva',
          headerName: 'IVA',
          width: 150,
          pinned: 'right',
          renderCell: (params) => formatColombianMoney(params?.iva ?? ''),
        },
      ],
    },
    className: 'col-span-6',
  },
  {
    name: 'desc_entrada_alm',
    label: 'Descripción de la entrada',
    multiline: true,
    minRows: 3,
    InputProps: {
      readOnly: true,
    },
    className: 'col-span-12',
  },
  {
    name: 'valor',
    label: 'Valor del servicio',
    type: 'money',
    className: 'col-span-12',
  },
  {
    name: 'iva',
    label: 'IVA del servicio',
    type: 'money',
    className: 'col-span-12',
  },
]
