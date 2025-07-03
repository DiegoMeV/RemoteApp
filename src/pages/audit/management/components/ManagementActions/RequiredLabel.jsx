import { InfoOutlined, WarningAmberOutlined } from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'
import styles from './styles/Actions.module.css'

const RequiredLabel = ({ isRequired }) => {
  return (
    <Box
      component='span'
      bgcolor='backgroundAccordion'
      className={styles.requiredLabelContainer}
    >
      <Grid
        container
        alignItems='center'
        spacing={0.5}
      >
        <Grid item>
          {isRequired ? <WarningAmberOutlined color='error' /> : <InfoOutlined color='info' />}
        </Grid>
        <Grid item>
          <Typography
            variant='body2'
            sx={{
              color: isRequired ? '#d32f2f' : '#0288d1',
            }}
          >
            {isRequired ? 'Obligatorio' : 'Opcional'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default RequiredLabel
