import { Box, Grid, Typography } from '@mui/material'
import { stepsLabels } from '../constants'
import ButtonsSubmit from './ButtonsSubmit'
import InputsForm from './InputsForm'

const FormSection = ({
  activeStep,
  form,
  onSubmit,
  idGroup,
  columnsTable,
  apiRef,
  requiredOption,
  labelButton,
}) => {
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
          {stepsLabels[activeStep]}
        </Typography>
      </Box>
      <Box
        bgcolor='backgroundGrey1'
        borderRadius='0 0 10px 10px'
        border='1px solid #0000000f'
        component='form'
        p={2}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <InputsForm
          form={form}
          idGroup={idGroup}
          columnsTable={columnsTable}
          apiRef={apiRef}
          requiredOption={requiredOption}
          labelButton={labelButton}
        />
        <ButtonsSubmit />
      </Box>
    </Grid>
  )
}

export default FormSection
