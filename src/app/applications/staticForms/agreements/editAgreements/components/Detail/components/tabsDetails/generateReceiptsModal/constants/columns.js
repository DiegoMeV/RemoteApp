import { Box } from '@mui/material'
import { formatColombianMoney } from '@/libV4'

const renderEstadoCuotas = (params) => {
  if (params?.rowNode?.type === 'pinnedRow') {
    return null
  }
  const isVencida = params.row.vencido === true
  const circleStyle = {
    display: 'inline-block',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: isVencida ? '#D32F2F' : '#2E7D32',
  }

  const ringStyle = {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    border: `2px solid ${isVencida ? '#D32F2F' : '#2E7D32'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '8px',
  }

  return (
    <div className='flex items-center gap-2'>
      <Box style={ringStyle}>
        <Box style={circleStyle}></Box>
      </Box>
      {isVencida ? 'Vencida' : 'Adeuda'}
    </div>
  )
}

export const columnsReceipts = [
  {
    headerName: 'Número de cuota',
    field: 'cuota',
  },
  {
    headerName: 'Fecha de vencimiento',
    field: 'fechaLimiteFmt',
  },
  {
    headerName: 'Estado',
    field: 'descEstado',
    renderCell: renderEstadoCuotas,
  },
  {
    headerName: 'Valor',
    field: 'valor',
    renderCell: (params) => formatColombianMoney(`${params?.value}`),
    valueGetter: (params) => Number(params?.value),
    type: 'number',
    minWidth: 100,
  },
]
