import { Card, CardContent, Typography } from '@mui/material'

const CardData = ({ title, value }) => {
  return (
    <Card sx={{ bgcolor: '#FF94A3', minWidth: '300px' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant='body1'
          textAlign='center'
          color='rgba(0,0,0, 0.6)'
          noWrap
          fontWeight={700}
        >
          {title}
        </Typography>
        <Typography
          variant='h5'
          textAlign='center'
          color='rgba(0,0,0, 0.6)'
          fontWeight={700}
          noWrap
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardData
