import { formatColombianMoney } from '@/libV4'
import { DeleteOutlined, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export const detalleOrdencolumns = ({ editOrAddRow, handleDelete }) => [
  { field: 'nro_detalle_contrato', headerName: 'Número de servicio', minWidth: 200 },
  {
    field: 'desc_detalle_contrato',
    headerName: 'Servicio',
  },
  {
    field: 'cpto_gasto',
    headerName: 'Número de concepto de gasto',
  },
  {
    field: 'nombre_cpto_gasto',
    headerName: 'Concepto de gasto',
  },
  {
    field: 'valor',
    headerName: 'Valor del servicio',
    type: 'number',
    width: 150,
    pinned: 'right',
    renderCell: (params) => formatColombianMoney(params?.valor ?? ''),
  },
  {
    field: 'iva',
    headerName: 'IVA del servicio',
    type: 'number',
    pinned: 'right',
    width: 150,
    renderCell: (params) => formatColombianMoney(params?.iva ?? ''),
  },
  {
    field: 'options',
    headerName: '',
    pinned: 'right',
    width: 90,
    renderCell: (params) => {
      return (
        <div className='flex justify-center'>
          <IconButton
            title='Editar'
            onClick={() => {
              editOrAddRow(params)
            }}
          >
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDelete(params)}>
            <DeleteOutlined />
          </IconButton>
        </div>
      )
    },
  },
]
