import { Box, Grid } from '@mui/material'
import { FormButtons } from '.'
import { FormGenericContainerStyles, FormGridStyles } from '../styles/radicationStyles'

const FormContainerSubmit = ({ children, onSubmit }) => {
  return (
    <Box
      component='form'
      onSubmit={onSubmit}
      sx={FormGenericContainerStyles}
    >
      <Grid
        container
        sx={FormGridStyles}
      >
        {children}
      </Grid>
      <FormButtons />
    </Box>
  )
}

export default FormContainerSubmit
