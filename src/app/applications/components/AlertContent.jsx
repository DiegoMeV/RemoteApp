import { Box } from '@mui/material'
import { sxContent } from '../styles/stylesSx'
import { useLocation } from 'react-router-dom'

const AlertContent = ({ children }) => {
  const { pathname } = useLocation()
  const isTreasuryMenu = pathname.includes('treasury')
  return (
    <Box
      component='main'
      sx={sxContent(isTreasuryMenu)}
    >
      {children}
    </Box>
  )
}

export default AlertContent
