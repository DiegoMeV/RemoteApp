import { Box, Grid } from '@mui/material'
import { RequiredLabel } from '..'
import { BackdropLoading } from '@/lib'
import styles from './styles/Actions.module.css'

const ElementContainer = ({ children, isRequired, sx }) => {
  return (
    <Box
      className={styles.elementContainer}
      bgcolor={'backgroundWhite1'}
      sx={sx}
    >
      {isRequired && <RequiredLabel isRequired={isRequired} />}
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

export default ElementContainer
