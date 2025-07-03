import { Box, Grid } from '@mui/material'
import { ClassicIconButton } from '@/lib'
import FormatClearIcon from '@mui/icons-material/FormatClear'
import BasicDataNewProcess from './BasicDataNewProcess'
import { FormGenericHeader } from '@/app/inbox/requirements/[idGroup]/components'
import FormGenericContainer from './FormGenericContainer'

//PROBAR

const BasicDataProcess = ({
  setBasicDataProcess,
  basicDataProcess,
  errorInfo,
  infoProcess,
  activeStep,
  setActiveStep,
  setErrorInfo,
  idSelected,
}) => {
  return (
    <Box sx={{ height: '100%' }}>
      <Box
        display='flex'
        alignContent='center'
      >
        <FormGenericHeader title='Datos básicos del proceso' />
        <ClassicIconButton
          onClick={() =>
            setBasicDataProcess((prevData) => prevData.map((data) => ({ ...data, value: '' })))
          }
          title='Limpiar campos'
          placement='right'
          color='secondary'
          hoverColor='red'
        >
          <FormatClearIcon />
        </ClassicIconButton>
      </Box>
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
        >
          <BasicDataNewProcess
            basicDataProcess={basicDataProcess}
            errorInfo={errorInfo}
            infoProcess={infoProcess}
            setBasicDataProcess={setBasicDataProcess}
          />
        </Grid>
      </FormGenericContainer>
    </Box>
  )
}

export default BasicDataProcess
