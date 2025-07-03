import { Paper, Typography } from '@mui/material'
import { loadingLogo } from '../../assets'

const ErrorComponent = () => {
  return (
    <div className='flex justify-center items-center h-full'>
      <Paper
        elevation={3}
        className='flex flex-col items-center text-center p-4'
      >
        <img
          src={loadingLogo}
          alt='logo.svg'
          width={250}
          height={250}
        />
        <Typography variant='h4'>Esta página tiene un error</Typography>
        <Typography variant='subtitle1'>
          Estamos trabajando en esta página. ¡Pronto estará disponible!
        </Typography>
      </Paper>
    </div>
  )
}

export default ErrorComponent
