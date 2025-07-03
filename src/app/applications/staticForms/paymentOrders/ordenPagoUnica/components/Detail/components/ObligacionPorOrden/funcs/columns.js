import { formatColombianMoney } from '@/libV4'
import { DeleteOutline } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import toast from 'react-hot-toast'

export const columnsObligacionPorOrden = ({ handleDelete, getFormValue }) => [
  {
    field: 'nrodoc_compptal',
    headerName: 'Número',
  },
  {
    field: 'tipo_compptal',
    headerName: 'Comprobante presupuestal (Nuevos Clasificadores)',
  },
  {
    field: 'concepto',
    headerName: 'Descripción',
  },
  {
    field: 'valor',
    headerName: 'Valor',
    type: 'number',
    width: 150,
    pinned: 'right',
    renderCell: (params) => formatColombianMoney(params?.valor),
  },
  {
    field: 'options',
    headerName: '',
    width: 60,
    pinned: 'right',
    renderCell: (row) => (
      <IconButton
        onClick={() => {
          const estado_orden_pagou = getFormValue('orden_pagou.estado')

          if (estado_orden_pagou !== 'V') {
            toast.error(
              'No se puede eliminar la obligación, ya que la orden de pago no está vigente'
            )
            return
          }

          handleDelete(row)
        }}
      >
        <DeleteOutline />
      </IconButton>
    ),
  },
]

export const columnsObligacionPorOrdenModal = () => [
  {
    field: 'nrodoc',
    headerName: 'Nro',
  },
  {
    field: 'prefijo',
    headerName: 'Prefijo',
  },
  {
    field: 'nro_comprobantepptal',
    headerName: 'Comprobante',
  },
  {
    field: 'tipo_compptal',
    headerName: 'Tipo de comprobante',
  },
  {
    field: 'concepto',
    headerName: 'Descripción',
  },
  {
    field: 'valor',
    headerName: 'Valor',
    type: 'number',
    width: 150,
    pinned: 'right',
    renderCell: (params) => formatColombianMoney(params?.valor),
  },
]
