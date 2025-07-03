import { MagicString } from '@/lib'
import { PayOrderOptions } from '../components'

export const columnsPaymentOrders = ({ setIdProcess, openModals, setInfoOrder }) => {
  return [
    { field: 'clase', headerName: 'Clase', width: 100 },
    { field: 'tipo', headerName: 'Tipo', width: 100 },
    { field: 'fechaOp', headerName: 'Fecha', width: 100 },
    { field: 'prefijo', headerName: 'Prefijo', width: 100 },
    { field: 'nroOrden', headerName: 'Nro Orden', width: 100 },
    { field: 'concepto', headerName: 'Concepto', width: 500 },
    { field: 'nroRubro', headerName: 'Nro Rubro', width: 200 },
    { field: 'rubro', headerName: 'Rubro', width: 500 },
    {
      field: 'fondo',
      headerName: 'Fondo',
      width: 200,
    },
    {
      field: 'nomFondo',
      headerName: 'Nombre Fondo',
      width: 200,
    },
    {
      field: 'unidad',
      headerName: 'Unidad',
      width: 200,
    },
    {
      field: 'nombreUnidad',
      headerName: 'Nombre Unidad',
      width: 200,
    },
    {
      field: 'valorTotal',
      headerName: 'Valor',
      width: 200,
      align: 'right',
      renderCell: (params) => {
        const formatCurrency = (value) => {
          return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(value)
        }
        return formatCurrency(params?.valorTotal ?? '')
      },
    },
    {
      field: 'tercero',
      headerName: 'Tercero',
      width: 200,
    },
    {
      field: 'nomTercero',
      headerName: 'Nombre Tercero',
      width: 200,
    },
    // {
    //   field: 'saldoOrden',
    //   headerName: 'Valor saldo',
    //   width: 200,
    //   align: 'right',
    //   valueGetter: (params) => {
    //     const formatCurrency = (value) => {
    //       return new Intl.NumberFormat('es-CO', {
    //         style: 'currency',
    //         currency: 'COP',
    //         minimumFractionDigits: 0,
    //         maximumFractionDigits: 0,
    //       }).format(value)
    //     }
    //     return formatCurrency(params?.row?.saldoOrden ?? '')
    //   },
    // },
    {
      field: 'estado',
      headerName: 'Estado',
      minWidth: 150,
      renderCell: (params) => {
        return MagicString.ORDER_PAYMENT_STATES[params?.estado]
      },
    },
    {
      field: 'tipoContrato',
      headerName: 'Tipo Contrato',
      minWidth: 150,
    },
    {
      field: 'nroContrato',
      headerName: 'Nro Contrato',
      width: 200,
    },
    {
      field: 'options',
      headerName: '',
      pinned: 'right',
      renderCell: (row) => {
        return (
          <PayOrderOptions
            setIdProcess={setIdProcess}
            setInfoOrder={setInfoOrder}
            openModals={openModals}
            item={row}
          />
        )
      },
    },
  ]
}
