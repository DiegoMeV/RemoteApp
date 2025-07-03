import { Card, CardContent, Typography } from '@mui/material'

const CardData = ({ title, value, color, body }) => {
  return (
    <Card sx={{ bgcolor: color ?? '#FF94A3', m: 2 }}>
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
        {body}
        {value && (
          <Typography
            variant='h5'
            textAlign='center'
            color='rgba(0,0,0, 0.6)'
            fontWeight={700}
            noWrap
          >
            {value}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default CardData
