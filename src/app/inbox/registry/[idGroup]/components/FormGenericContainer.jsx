import { Box, Grid } from '@mui/material'
import { NavigationButtons } from '.'
import {
  FormGenericContainerStyles,
  FormGenericGridStyles,
} from '@/app/inbox/requirements/[idGroup]/styles'

const FormGenericContainer = ({
  children,
  onSubmit,
  styleChild,
  type,
  containerProps,
  basicDataProcess,
  infoProcess,
  idSelected,
  activeStep,
  setActiveStep,
  setErrorInfo,
}) => {
  return (
    <Box
      component={type ?? 'form'}
      onSubmit={onSubmit}
      sx={FormGenericContainerStyles}
    >
      <Grid
        container
        {...containerProps}
        sx={{ ...FormGenericGridStyles, ...styleChild }}
      >
        {children}
      </Grid>
      <NavigationButtons
        basicDataProcess={basicDataProcess}
        infoProcess={infoProcess}
        idSelected={idSelected}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        setErrorInfo={setErrorInfo}
      />
    </Box>
  )
}

export default FormGenericContainer
