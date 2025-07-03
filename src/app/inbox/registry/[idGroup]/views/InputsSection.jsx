import { Grid } from '@mui/material'
import { BasicDataProcess, SelectProcess, SummaryNewProcess } from '../components'
import { useProcessAllInfo } from '../hooks'
import ModalRegistrySummary from '../components/ModalRegistrySummary'

const InputsSection = ({ processTypes, processGroupsData, activeStep, setActiveStep }) => {
  const [statesVariables, statesFunctions] = useProcessAllInfo({ activeStep })
  const { errorInfo, idSelected, infoProcess, basicDataProcess } = statesVariables
  const { setIdSelected, setInfoProcess, setBasicDataProcess, setErrorInfo } = statesFunctions

  return (
    <Grid
      item
      component='section'
      xs={12}
      md={9}
      sx={{
        pt: 1,
        pl: 1.5,
        pr: { xs: 1.5, md: 5 },
      }}
    >
      {activeStep === 0 ? (
        <SelectProcess
          infoProcess={infoProcess}
          processTypes={processTypes}
          setInfoProcess={setInfoProcess}
          errorInfo={errorInfo}
          idSelected={idSelected}
          setIdSelected={setIdSelected}
          basicDataProcess={basicDataProcess}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          setErrorInfo={setErrorInfo}
        />
      ) : activeStep === 1 ? (
        <BasicDataProcess
          idSelected={idSelected}
          setIdSelected={setIdSelected}
          setBasicDataProcess={setBasicDataProcess}
          basicDataProcess={basicDataProcess}
          errorInfo={errorInfo}
          infoProcess={infoProcess}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          setErrorInfo={setErrorInfo}
        />
      ) : activeStep === 2 || activeStep === 3 ? (
        <SummaryNewProcess
          processGroupsData={processGroupsData}
          idSelected={idSelected}
          infoProcess={infoProcess}
          basicDataProcess={basicDataProcess}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          setErrorInfo={setErrorInfo}
        />
      ) : null}
      {activeStep === 3 && (
        <ModalRegistrySummary
          open={activeStep === 3}
          infoProcess={infoProcess}
          basicDataProcess={basicDataProcess}
          setActiveStep={setActiveStep}
        />
      )}
    </Grid>
  )
}

export default InputsSection
