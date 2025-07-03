import { Box, Grid } from '@mui/material'
import { FormGenericContainerStyles, FormGenericGridStyles } from '../../styles/FormStyles'
import { NavigationBtnSteps } from '.'

const FormGenericContainer = ({
  children,
  onSubmit,
  currentStep,
  setStep,
  styleChild,
  type,
  handleBackComplement,
  styleContainer,
}) => {
  return (
    <Box
      component={type ?? 'form'}
      onSubmit={onSubmit}
      sx={{ ...FormGenericContainerStyles, ...styleContainer }}
    >
      <Grid
        container
        sx={{ ...FormGenericGridStyles, ...styleChild }}
      >
        {children}
      </Grid>
      <NavigationBtnSteps
        currentStep={currentStep}
        setStep={setStep}
        handleBackComplement={handleBackComplement}
      />
    </Box>
  )
}

export default FormGenericContainer
