import { Box, Card, CardContent, Typography } from '@mui/material'

const CardLayout = ({ title, children }) => {
  return (
    <Card sx={{ mb: '20px' }}>
      <CardContent sx={{ p: 0 }}>
        <Box
          p={2}
          bgcolor={'backgroundGrey2'}
        >
          <Typography
            variant='h5'
            color='primary'
          >
            {title}
          </Typography>
        </Box>
        <Box p={2}>{children}</Box>
      </CardContent>
    </Card>
  )
}

export default CardLayout
