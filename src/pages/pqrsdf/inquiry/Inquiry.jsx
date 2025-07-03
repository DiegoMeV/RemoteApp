import { SquareIconButton } from '@/lib'
import { TextField, Typography } from '@mui/material'
import { LogoHeader } from '../home/components'

const Inquiry = () => {
  return (
    <div className='flex w-full justify-center'>
      <div className='flex flex-col w-full max-w-md items-center'>
        <LogoHeader />
        <Typography
          variant='customSubtitle'
          width='100%'
          my={2}
        >
          Consulte su radicado
        </Typography>
        <form className='flex flex-col gap-8 w-full'>
          <TextField
            label='Número de radicado'
            variant='outlined'
            size='small'
            fullWidth
          />
          <TextField
            label='Código de verificación del radicado'
            variant='outlined'
            size='small'
            fullWidth
          />
          <SquareIconButton
            text='Consultar'
            type='submit'
          />
        </form>
      </div>
    </div>
  )
}

export default Inquiry
