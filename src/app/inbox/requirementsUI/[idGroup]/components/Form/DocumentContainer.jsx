import { Box } from '@mui/material'
import styles from '../../styles/Requirements.module.css'

const DocumentContainer = ({ children, component = 'div' }) => {
  return (
    <Box
      component={component}
      className={styles.documentContainer}
    >
      {children}
    </Box>
  )
}

export default DocumentContainer
