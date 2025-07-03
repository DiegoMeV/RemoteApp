import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material'

export default function PqrsdfCard({
  icon,
  title,
  description,
  expanded,
  onToggle,
  onClick,
  keyName,
}) {
  return (
    <Card
      sx={{
        '&:hover': {
          boxShadow: 6,
        },
        minHeight: 300,
      }}
      onClick={() => onClick(keyName)}
    >
      <CardMedia
        sx={{
          height: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#D9D9D980',
        }}
      >
        {icon}
      </CardMedia>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          alignItems: 'flex-start',
        }}
      >
        <Typography
          fontWeight='bold'
          fontSize='16px'
        >
          {title}
        </Typography>

        <Typography
          variant='body2'
          color='text.secondary'
        >
          {expanded ? description.full : description.short}
        </Typography>

        <Button
          onClick={(event) => {
            event.stopPropagation()
            onToggle()
          }}
          size='small'
          sx={{
            fontWeight: 600,
            display: 'absolute',
            bottom: 0,
          }}
        >
          {expanded ? 'Ver menos' : 'Leer más'}
        </Button>
      </CardContent>
    </Card>
  )
}
