import { GenericMoney } from '@/lib'
import { Typography } from '@mui/material'

const SumaryTotal = ({ totals }) => {
  return (
    <div className='flex flex-col items-end gap-y-2 pr-[90px] pt-4 w-full'>
      <div className='flex items-center gap-x-2'>
        <Typography
          variant='body1'
          fontWeight='bold'
        >
          Subtotal entradas
        </Typography>
        <GenericMoney
          value={totals?.subtotalValue1}
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
          value={totals?.subtotalValue2}
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
          Total entradas
        </Typography>
        <GenericMoney
          value={totals?.totalService}
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
