import { Box, Grid } from '@mui/material'
import CardData from '../../resultCards/components/CardData'
import { gridReportTable } from '../styles'
import { formatColombianMoney } from '@/lib'

const ReportTable = ({ heatmapData }) => {
  return (
    <Grid
      item
      xs={12}
      sx={gridReportTable}
    >
      <Box width='50%'>
        <CardData
          title='Total general de alertas'
          value={formatColombianMoney(heatmapData?.length, null)}
        />
      </Box>
    </Grid>
  )
}

export default ReportTable
