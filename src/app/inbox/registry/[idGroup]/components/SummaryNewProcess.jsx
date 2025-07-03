import { Box } from '@mui/material'
import CardInfoSummaryDescription from './CardInfoSummaryDescription'
import CardProcessDetail from './CardProcessDetail'
import NavigationButtons from './NavigationButtons'
import { FormGenericHeader } from '@/app/inbox/requirements/[idGroup]/components'
import { FormGenericContainerStyles } from '../styles'

const SummaryNewProcess = ({
  idSelected,
  processGroupsData,
  basicDataProcess,
  infoProcess,
  activeStep,
  setActiveStep,
  setErrorInfo,
}) => {
  return (
    <Box sx={{ height: '100%' }}>
      <FormGenericHeader title='Detalle del resumen' />
      <Box sx={FormGenericContainerStyles}>
        <CardProcessDetail
          processGroupsData={processGroupsData}
          infoProcess={infoProcess}
          idSelected={idSelected}
        />
        {basicDataProcess ? (
          <CardInfoSummaryDescription basicDataProcess={basicDataProcess} />
        ) : null}
        <NavigationButtons
          basicDataProcess={basicDataProcess}
          infoProcess={infoProcess}
          idSelected={idSelected}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          setErrorInfo={setErrorInfo}
        />
      </Box>
    </Box>
  )
}

export default SummaryNewProcess
