import { Card, CardContent } from '@mui/material'

const ExpedientesCard = ({ bgColor, children, maxWidth, minWidth }) => {
  return (
    <Card
      elevation={3}
      sx={{
        width: '100%',
        minWidth: minWidth ?? 300,
        maxWidth: maxWidth ?? 800,
        borderRadius: 2,
        backgroundColor: bgColor ?? 'white',
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export default ExpedientesCard
