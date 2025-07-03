import { formatColombianMoney } from '@/libV4'
import { DeleteOutlined, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const excludedFieldsByTipo = { GASTO: 'id_conceptocaja', INGRESO: 'cpto_gasto', DEFAULT: '' }

export const detalleOrdencolumns = ({ editOrAddRow, handleDelete, ordenPagoTipoCpto }) => {
  const columns = [
    { field: 'id_centrocosto', headerName: 'Id Centro de costo', minWidth: 200 },
    {
      field: 'nombre_centro_costo',
      headerName: 'Centro de costo',
    },
    {
      field: 'tercero',
      headerName: 'Tercero',
    },
    {
      field: 'nombre_tercero',
      headerName: 'Nombre del tercero',
    },
    {
      field: 'grupo',
      headerName: 'Nat. Gasto',
    },
    {
      field: 'cpto_gasto',
      headerName: 'Concepto de gasto',
    },
    {
      field: 'id_conceptocaja',
      headerName: 'Id Concepto de caja',
    },
    {
      field: 'concepto',
      headerName: 'Concepto',
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
  const excludeField = excludedFieldsByTipo[ordenPagoTipoCpto] || excludedFieldsByTipo.DEFAULT

  const filteredColumns = columns.filter((col) => col.field !== excludeField)

  return filteredColumns
}
