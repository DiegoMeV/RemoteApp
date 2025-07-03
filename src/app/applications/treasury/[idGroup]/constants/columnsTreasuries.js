import { MagicString } from '@/lib'
import { TreasuryOptions } from '../components'

export const columnsTreasuriesList = ({ setIdProcess, openModals, setInfoOrder }) => {
  return [
    { field: 'nrodoc', headerName: 'NroDoc', width: 100 },
    { field: 'prefijo', headerName: 'Prefijo', width: 100 },
    { field: 'tipo', headerName: 'Tipo', width: 200 },
    {
      field: 'nomTercero',
      headerName: 'Beneficiario',
      width: 200,
      valueGetter: (params) => {
        return `${params?.row?.tercero ?? ''} ${params?.row?.nomTercero ?? ''}`
      },
    },
    {
      field: 'nomCentrocosto',
      headerName: 'Centro de costo',
      width: 200,
      valueGetter: (params) => {
        return `${params?.row?.idCentrocosto ?? ''} - ${params?.row?.nomCentrocosto ?? ''}`
      },
    },
    {
      field: 'valor',
      headerName: 'Valor',
      width: 200,
      align: 'right',
      valueGetter: (params) => {
        const formatCurrency = (value) => {
          return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(value)
        }
        return formatCurrency(params?.row?.valor ?? '')
      },
    },
    {
      field: 'saldoOrden',
      headerName: 'Valor saldo',
      width: 200,
      align: 'right',
      valueGetter: (params) => {
        const formatCurrency = (value) => {
          return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(value)
        }
        return formatCurrency(params?.row?.saldoOrden ?? '')
      },
    },
    {
      field: 'estado',
      headerName: 'Estado',
      minWidth: 150,
      valueGetter: (params) => {
        return MagicString.ORDER_PAYMENT_STATES[params?.row?.estado]
      },
    },
    {
      field: 'options',
      headerName: '',
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      headerAlign: 'center',
      hideable: false,
      minWidth: 120,
      renderCell: (params) => {
        return (
          <TreasuryOptions
            setIdProcess={setIdProcess}
            setInfoOrder={setInfoOrder}
            openModals={openModals}
            item={params?.row}
          />
        )
      },
    },
  ]
}
