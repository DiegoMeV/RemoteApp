import { Polygon } from '@react-google-maps/api'
import departamentosGeoJson from '../geoJson/geoJsonDepartamentos.json'
import { getDepartmentAlertInfo } from '../funcs'
import { polygonOptions } from '../styles'

const PolygonsOfApartments = ({ dataPolygon }) => {
  return (
    <>
      {departamentosGeoJson.features
        .filter((depart) =>
          dataPolygon?.some(
            (alert) => depart.properties?.NOMBRE_DPT?.toUpperCase() === alert?.nombre?.toUpperCase()
          )
        )
        .map((feature, index) => {
          const { color } = getDepartmentAlertInfo(dataPolygon, feature)
          return (
            <Polygon
              key={index}
              paths={feature.geometry.coordinates[0].map((coords) => ({
                lat: coords[1],
                lng: coords[0],
              }))}
              options={polygonOptions(color)}
            />
          )
        })}
    </>
  )
}

export default PolygonsOfApartments
