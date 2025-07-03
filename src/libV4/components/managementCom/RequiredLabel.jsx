import { InfoOutlined, WarningAmberOutlined } from '@mui/icons-material'
import { Typography } from '@mui/material'

const RequiredLabel = ({ isRequired }) => {
  return (
    <div className='backgroundwhite1 absolute top-0 p-2'>
      <div className='flex justify-center items-center gap-2'>
        {isRequired ? <WarningAmberOutlined color='error' /> : <InfoOutlined color='info' />}
        <Typography
          variant='body2'
          sx={{
            color: isRequired ? '#d32f2f' : '#0288d1',
          }}
        >
          {isRequired ? 'Obligatorio' : 'Opcional'}
        </Typography>
      </div>
    </div>
  )
}

export default RequiredLabel
