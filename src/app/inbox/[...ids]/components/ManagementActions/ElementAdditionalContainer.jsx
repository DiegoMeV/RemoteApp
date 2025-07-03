import { Box, Grid } from '@mui/material'
import { BackdropLoading } from '@/lib'
import styles from './styles/Actions.module.css'

const ElementAdditionalContainer = ({ children }) => {
  return (
    <Box
      className={styles.elementContainer}
      bgcolor={'backgroundWhite1'}
    >
      <BackdropLoading loading={false} />
      <Grid
        mt={0.1}
        container
        spacing={2}
        className={styles.elementContainerGrid}
      >
        {children}
      </Grid>
    </Box>
  )
}

export default ElementAdditionalContainer
