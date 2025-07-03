import { Grid } from '@mui/material'

import { useMapControls } from './hooks'
import { ButtonsSelects, ViewGoogleMap } from './components'

const HeatMap = ({
  center = {
    lat: 3.666666,
    lng: -73.2973333,
  },
  zoom = 6,
  dataPolygon,
  markers,
}) => {
  const { isLoaded, propsButtonSelects, propsGoogleMap } = useMapControls()

  const combinedPropsGoogleMap = {
    ...propsGoogleMap,
    center,
    zoom,
    dataPolygon,
    markers,
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
      </Grid>
    )
  )
}

export default HeatMap
