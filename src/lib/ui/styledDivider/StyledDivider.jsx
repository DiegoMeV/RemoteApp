import { Box } from '@mui/material'
import { styles } from './styles'

const StyledDivider = () => {
  return (
    <Box className={styles.container_divider}>
      <span className={styles.container_divider__line} />
      <Box className={styles.container_divider__circular}>ó</Box>
      <span className={styles.container_divider__line} />
    </Box>
  )
}

export default StyledDivider
