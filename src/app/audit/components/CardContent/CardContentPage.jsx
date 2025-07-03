import { Card, CardContent } from '@mui/material'
import { cardContent } from './style'

const CardContentPage = ({ children }) => {
  return (
    <Card
      className='grid grid-cols-12 gap-4'
      sx={{ padding: 2, bgcolor: 'backgroundGrey1' }}
    >
      <CardContent
        className='col-span-12'
        sx={cardContent}
      >
        {children}
      </CardContent>
    </Card>
  )
}

export default CardContentPage
