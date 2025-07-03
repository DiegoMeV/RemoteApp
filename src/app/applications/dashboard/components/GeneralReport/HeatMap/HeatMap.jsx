import { Grid } from '@mui/material'

import { useMapControls } from './hooks'
import { ButtonsSelects, ReportTable, ViewGoogleMap } from './components'
import { useQueryDynamicApi } from '@/lib'

const HeatMap = ({ center, zoom }) => {
  const { data: alertasMark } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    url: '/municipios/alertas',
  })
  const { isLoaded, propsButtonSelects, propsGoogleMap } = useMapControls()

  const combinedPropsGoogleMap = {
    ...propsGoogleMap,
    center,
    zoom,
    alertasMark: alertasMark?.data,
  }

  return (
    isLoaded && (
      <Grid
        container
        spacing={2}
        p={2}
        style={{ position: 'relative' }}
      >
        <ButtonsSelects {...propsButtonSelects} />
        <ViewGoogleMap {...combinedPropsGoogleMap} />
        <ReportTable heatmapData={alertasMark?.data} />
      </Grid>
    )
  )
}

export default HeatMap
