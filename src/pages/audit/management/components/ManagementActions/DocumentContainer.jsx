import { Box } from '@mui/material'
import styles from './styles/Actions.module.css'

const DocumentContainer = ({ children, component = 'div', ...moreProps }) => {
  return (
    <Box
      component={component}
      className={styles.documentContainer}
      {...moreProps}
    >
      {children}
    </Box>
  )
}

export default DocumentContainer
