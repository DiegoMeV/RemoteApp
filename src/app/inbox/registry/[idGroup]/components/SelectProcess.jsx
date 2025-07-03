import { Box, Grid, TextField } from '@mui/material'
import ProcessAutocomplete from './ProcessAutocomplete'
import DependenciesAutocomplete from './DependenciesAutocomplete'
import { FormGenericHeader } from '@/app/inbox/requirements/[idGroup]/components'
import FormGenericContainer from './FormGenericContainer'

const SelectProcess = ({
  setInfoProcess,
  errorInfo,
  idSelected,
  infoProcess,
  processTypes,
  basicDataProcess,
  activeStep,
  setActiveStep,
  setErrorInfo,
}) => {
  return (
    <Box sx={{ height: '100%' }}>
      <FormGenericHeader title='Selección de tipo de proceso' />
      <FormGenericContainer
        basicDataProcess={basicDataProcess}
        infoProcess={infoProcess}
        idSelected={idSelected}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        setErrorInfo={setErrorInfo}
        styleChild={{ py: '15px', px: '20px' }}
      >
        <Grid
          item
          xs={12}
          md={6}
          pr={1}
          py={1}
        >
          <ProcessAutocomplete
            processTypes={processTypes}
            infoProcess={infoProcess}
            setInfoProcess={setInfoProcess}
            errorInfo={errorInfo}
            idSelected={idSelected}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          pl={1}
          py={1}
        >
          <DependenciesAutocomplete
            infoProcess={infoProcess}
            setInfoProcess={setInfoProcess}
            errorInfo={errorInfo}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          py={1}
        >
          <TextField
            label='Agregue una descripción'
            fullWidth
            value={infoProcess?.descriptionProcess ?? ''}
            onChange={(ev) => {
              const { value } = ev.target
              setInfoProcess((prevValues) => ({ ...prevValues, descriptionProcess: value }))
            }}
            multiline
            rows={5}
          />
        </Grid>
      </FormGenericContainer>
    </Box>
  )
}

export default SelectProcess
