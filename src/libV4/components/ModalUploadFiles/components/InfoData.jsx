import { Box } from '@mui/material'

const InfoData = ({ children, color, bgcolor }) => {
  return (
    <Box
      bgcolor={bgcolor ?? '#fff'}
      display='flex'
      alignItems='center'
      justifyContent='center'
      boxShadow={3}
      p={2}
      color={color ?? null}
      borderRadius='8px'
      gap={2}
    >
      {children}
    </Box>
  )
}

export default InfoData
