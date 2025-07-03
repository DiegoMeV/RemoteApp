import { ErrorOutline } from '@mui/icons-material'
import { Card, CardContent, Typography } from '@mui/material'
import { cardError } from '../styles'

const CardDocumentError = ({ message }) => {
  return (
    <Card sx={cardError}>
      <ErrorOutline
        sx={{ fontSize: 40, ml: '10px' }}
        color='error'
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant='h6'
          component='div'
          sx={{ fontSize: '18px' }}
        >
          Informacion no encontrada
        </Typography>
        <Typography
          variant='body2'
          sx={{ fontSize: '12px' }}
        >
          {message}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardDocumentError
