import { Box } from '@mui/material'
import { ContentConstructorStyles } from '../styles'

const ContentConstructor = ({ children }) => {
  
  return (
    <Box
      component='main'
      className={ContentConstructorStyles.contentConstructor}
    >
      {children}
    </Box>
  )
}

export default ContentConstructor
