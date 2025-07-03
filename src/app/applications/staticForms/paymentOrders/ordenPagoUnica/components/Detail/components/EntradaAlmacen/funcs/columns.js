import { formatColombianMoney } from '@/libV4'

export const entradaAlmacenLOVColumns = [
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
]
