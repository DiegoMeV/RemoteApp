import { Box, Grid, Typography } from '@mui/material'
import ButtonsSubmit from './ButtonsSubmit'

const FormContainer = (props) => {
  return (
    <Grid
      item
      xs={12}
      md={9}
    >
      <Box
        width='100%'
        border='1px solid #0000000f'
        borderRadius='10px 10px 0 0'
        p='10px 15px'
        bgcolor='backgroundGrey2'
      >
        <Typography
          variant='h6'
          color='primary'
        >
          {props.stepsLabels[props.activeStep]}
        </Typography>
      </Box>
      <Box
        bgcolor='backgroundGrey1'
        borderRadius='0 0 10px 10px'
        border='1px solid #0000000f'
        component='form'
        p={2}
        onSubmit={props.form.handleSubmit(props.onSubmit)}
      >
        {props.children}
        <ButtonsSubmit
          finalStep={props.finalStep}
          activeStep={props.activeStep}
          setActiveStep={props.setActiveStep}
        />
      </Box>
    </Grid>
  )
}

export default FormContainer
