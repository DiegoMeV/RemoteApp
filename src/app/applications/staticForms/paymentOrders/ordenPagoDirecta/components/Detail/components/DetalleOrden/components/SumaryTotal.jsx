import { GenericMoney } from '@/lib'
import { Typography } from '@mui/material'

const SumaryTotal = ({ totals, detalleOrdenValorNeto }) => {
  return (
    <div className='flex flex-col items-end gap-y-2 pr-[90px] pt-4 w-full'>
      <div className='flex items-center gap-x-2'>
        <Typography
          variant='body1'
          fontWeight='bold'
        >
          Subtotal servicios
        </Typography>
        <GenericMoney
          value={totals?.subtotalValue1 ?? 0}
          variant='standard'
          InputProps={{
            style: {
              textAlign: 'right',
            },
          }}
          sx={{
            width: '140px',
          }}
        />

        <GenericMoney
          value={totals?.subtotalValue2 ?? 0}
          variant='standard'
          InputProps={{
            style: {
              textAlign: 'right',
            },
          }}
          sx={{
            width: '140px',
          }}
        />
      </div>
      <div className='flex items-center gap-x-2 pr-[155px]'>
        <Typography
          variant='body1'
          fontWeight='bold'
        >
          Valor neto
        </Typography>
        <GenericMoney
          value={detalleOrdenValorNeto ?? 0}
          variant='standard'
          InputProps={{
            style: {
              textAlign: 'right',
            },
          }}
          sx={{
            width: '140px',
          }}
        />
      </div>
    </div>
  )
}

export default SumaryTotal
