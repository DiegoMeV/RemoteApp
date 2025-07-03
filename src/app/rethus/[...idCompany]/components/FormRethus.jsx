import { StepperRequirements } from '@/app/inbox/components'
import { BackdropLoading, BasicTitle, ErrorPage } from '@/lib'
import { Box, Grid, Typography } from '@mui/material'
import { StepperHeaderStyleContainer } from '@/app/inbox/requirements/[idGroup]/styles'
import { stepsForRethus } from '../constants'
import ButtonsSubmit from './ButtonsSubmit'

const FormRethus = ({
  isLoading,
  infoGroupProcess,
  error,
  activeStep,
  handleSubmit,
  onSubmit,
  stepComponents,
  setActiveStep,
}) => {
  return (
    <Box p={3}>
      {isLoading ? (
        <BackdropLoading loading={isLoading} />
      ) : !infoGroupProcess || error ? (
        <ErrorPage />
      ) : (
        <>
          <BasicTitle
            title={'ReTHUS - Registro Único Nacional del Talento Humano en Salud​'}
            backpath='/inbox'
          />
          <Grid
            container
            spacing={3}
          >
            <StepperRequirements
              steps={stepsForRethus}
              step={activeStep}
            />
            <Grid
              item
              xs={12}
              md={9}
            >
              <Box sx={StepperHeaderStyleContainer}>
                <Typography
                  variant='h6'
                  color='primary'
                >
                  {stepsForRethus[activeStep]}
                </Typography>
              </Box>
              <Box
                bgcolor='backgroundGrey1'
                borderRadius='0 0 10px 10px'
                border='1px solid #0000000f'
                component='form'
                p={2}
                onSubmit={handleSubmit(onSubmit)}
              >
                {stepComponents[activeStep]}
                {activeStep !== 6 && (
                  <ButtonsSubmit
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  )
}

export default FormRethus
