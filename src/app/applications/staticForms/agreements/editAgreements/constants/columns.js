import { formatColombianMoney } from '@/libV4'
import { PageviewOutlined, PictureAsPdf } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { colorStatus } from './utils'

// Columns for the Dues, Receipts Issued, Payments, and Files sections in the Agreements application

export const duesColumns = ({ openModal = {}, setCurrentRow = () => {} } = {}) => {
  const handleViewInfo = ({ params }) => {
    openModal?.handleShow(params)
    setCurrentRow(params.row)
  }

  return [
    { field: 'cuota', headerName: 'Cuota', minWidth: 150 },
    {
      field: 'fecha_limite',
      headerName: 'Fecha límite (dd/mm/aaaa)',
      minWidth: 150,
    },
    {
      field: 'valor',
      headerName: 'Valor',
      type: 'number',
      minWidth: 150,
      renderCell: (params) => formatColombianMoney(params?.valor ?? ''),
    },
    {
      field: 'estado',
      headerName: 'Estado',
      minWidth: 150,
      renderCell: (params) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            colorStatus[params.estado?.toLowerCase()] || 'bg-gray-100 text-gray-800'
          }`}
        >
          {params.estado}
        </span>
      ),
    },
    {
      field: 'options',
      headerName: '',
      pinned: 'right',
      width: 90,
      renderCell: (params) => {
        return (
          <IconButton
            title='Ver'
            color='primary'
            onClick={() => handleViewInfo({ params })}
          >
            <PageviewOutlined />
          </IconButton>
        )
      },
    },
  ]
}

export const receiptsIssuedColumns = ({ handleViewDocument = () => {} }) => {
  return [
    { field: 'fecha', headerName: 'Fecha (dd/mm/aaaa)' },
    {
      field: 'fecha_limite',
      headerName: 'Fecha límite (dd/mm/aaaa)',
    },
    { field: 'numero', headerName: 'Número de recibo' },
    {
      field: 'valor',
      headerName: 'Valor',
      type: 'number',
      renderCell: (params) => formatColombianMoney(params?.valor ?? ''),
    },
    {
      field: 'nom_estado',
      headerName: 'Estado',
    },
    {
      field: 'usuario',
      headerName: 'Generado por',
    },
    {
      field: 'cuota_inicial',
      headerName: 'Cuota inicial',
    },
    {
      field: 'cuota_final',
      headerName: 'Cuota final',
    },
    {
      field: 'propietario',
      headerName: 'Propietario',
    },
    {
      field: 'obervaciones',
      headerName: 'Observaciones',
      width: 200,
    },
    {
      field: 'options',
      headerName: '',
      pinned: 'right',
      width: 90,
      renderCell: (params) => {
        return (
          <IconButton
            title='Imprimir recibo'
            color='primary'
            onClick={() => handleViewDocument({ params })}
          >
            <PictureAsPdf />
          </IconButton>
        )
      },
    },
  ]
}

export const paymentsColumns = ({ openModal = {}, setCurrentRow = () => {} } = {}) => {
  const handleViewInfo = ({ params }) => {
    openModal?.handleShow(params)
    setCurrentRow(params.row)
  }

  return [
    { field: 'fecha', headerName: 'Fecha del pago (dd/mm/aaaa)' },
    {
      field: 'pago',
      headerName: 'Consecutivo',
    },
    { field: 'factura', headerName: 'Factura' },
    {
      field: 'valor',
      headerName: 'Valor pagado',
      renderCell: (params) => formatColombianMoney(params?.valor ?? ''),
    },
    {
      field: 'banco',
      headerName: 'Banco',
    },
    {
      field: 'edad',
      headerName: 'Edad',
    },
    {
      field: 'obervaciones',
      headerName: 'Observaciones',
      minWidth: 200,
    },
    {
      field: 'options',
      headerName: '',
      pinned: 'right',
      width: 90,
      renderCell: (params) => {
        return (
          <IconButton
            title='Ver'
            color='primary'
            onClick={() => handleViewInfo({ params })}
          >
            <PageviewOutlined />
          </IconButton>
        )
      },
    },
  ]
}

export const filesColumns = () => {
  return [
    { field: 'NUM_EXPEDIENTE', headerName: 'Expediente Nro.', width: 200 },
    { field: 'NOM_TIPOPROCESO', headerName: 'Tipo de expediente', width: 250 },
    { field: 'NOM_ESTADO', headerName: 'Estado', width: 200 },
  ]
}
