import { GoogleMap, MarkerF, HeatmapLayerF } from '@react-google-maps/api'
import PolygonsOfApartments from './PolygonsOfApartments'
import { mapOptions } from '../const'
import { mapContainerStyle } from '../styles'

const ViewGoogleMap = ({
  mapVersion,
  center,
  zoom,
  setMap,
  viewMarkers,
  map,
  departamentos,
  alertasMark,
}) => {
  return (
    <GoogleMap
      key={mapVersion}
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoom}
      options={mapOptions}
      onLoad={setMap}
    >
      {viewMarkers && map && (
        <>
          {alertasMark?.map((data, index) => (
            <MarkerF
              key={index}
              position={{ lat: data.lat, lng: data.lng }}
            />
          ))}
          <HeatmapLayerF
            data={alertasMark?.map((data) => ({
              location: new window.google.maps.LatLng(data.lat, data.lng),
              weight: 3,
            }))}
            options={{
              radius: 20,
            }}
          />
        </>
      )}
      {departamentos && <PolygonsOfApartments />}
    </GoogleMap>
  )
}

export default ViewGoogleMap
