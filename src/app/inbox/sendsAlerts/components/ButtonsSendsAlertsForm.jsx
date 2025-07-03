import { Box, Button, Grid } from '@mui/material'

const ButtonsSendsAlertsForm = ({ activeStep, handleBack, handleCreateFolder, disabled }) => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        display: 'flex',
        justifyContent: activeStep === 2 ? 'space-between' : 'flex-end',
        pt: 2,
      }}
    >
      <Button
        sx={{ display: activeStep === 2 ? 'flex' : 'none' }}
        variant='contained'
        color='success'
        onClick={handleCreateFolder}
        disabled={disabled}
      >
        Crear expediente
      </Button>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          columnGap: 2,
        }}
      >
        <Button
          variant='contained'
          color='error'
          onClick={handleBack}
          disabled={activeStep === 3}
        >
          Atras
        </Button>
        <Button
          variant='contained'
          type='submit'
        >
          {activeStep !== 3 ? 'Siguiente' : 'Finalizar'}
        </Button>
      </Box>
    </Grid>
  )
}

export default ButtonsSendsAlertsForm
