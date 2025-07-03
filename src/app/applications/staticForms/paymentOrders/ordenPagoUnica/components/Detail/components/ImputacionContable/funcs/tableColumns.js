import { formatColombianMoney } from '@/libV4'

export const imputacionContableColumns = [
  {
    field: 'cuenta',
    headerName: 'Cuenta',
    minWidth: 200,
  },
  {
    field: 'debito',
    headerName: 'Débito',
    minWidth: 200,
    type: 'number',
    renderCell: (params) => formatColombianMoney(params?.debito ?? ''),
  },
  {
    field: 'credito',
    headerName: 'Crédito',
    minWidth: 200,
    type: 'number',
    renderCell: (params) => formatColombianMoney(params?.credito ?? ''),
  },
  {
    field: 'tercero',
    headerName: 'Tercero',
    minWidth: 150,
  },
  {
    field: 'nombre_tercero',
    headerName: 'Nombre tercero',
    minWidth: 150,
  },
  {
    field: 'descripcion',
    headerName: 'Descripción',
    minWidth: 150,
  },
]
