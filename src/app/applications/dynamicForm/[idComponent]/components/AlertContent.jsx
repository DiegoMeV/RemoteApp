import { Box } from '@mui/material'
import { sxContent } from '../styles'

const AlertContent = ({ children }) => {
  return (
    <Box
      component='main'
      sx={sxContent}
    >
      {children}
    </Box>
  )
}

export default AlertContent
