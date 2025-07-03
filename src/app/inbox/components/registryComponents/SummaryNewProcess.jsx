import { Grid } from '@mui/material'
import CardProcessDetail from './CardProcessDetail'
import CardInfoSummaryDescription from './CardInfoSummaryDescription'

const SummaryNewProcess = ({
  idSelected,
  processGroupsData,
  basicDataProcess,
  infoProcess,
} = {}) => {
  return (
    <Grid
      item
      xs={12}
    >
      <CardProcessDetail
        processGroupsData={processGroupsData}
        infoProcess={infoProcess}
        idSelected={idSelected}
      />
      {basicDataProcess ? <CardInfoSummaryDescription basicDataProcess={basicDataProcess} /> : null}
    </Grid>
  )
}

export default SummaryNewProcess
