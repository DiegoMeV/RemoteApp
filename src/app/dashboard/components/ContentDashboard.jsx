import { Box } from '@mui/material'
import styles from '../styles/Dashboard.module.css'

const ContentDashboard = ({ children }) => {
  return <Box className={styles.contentDash}>{children}</Box>
}

export default ContentDashboard
