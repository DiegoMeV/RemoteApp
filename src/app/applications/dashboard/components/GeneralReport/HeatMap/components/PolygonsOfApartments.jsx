import { Polygon } from '@react-google-maps/api'
import departamentosGeoJson from '../geoJson/geoJsonDepartamentos.json'
import { useDepartamentsAlerts } from '@/lib'
import { getDepartmentAlertInfo } from '../funcs'
import { polygonOptions } from '../styles'

const PolygonsOfApartments = () => {
  const { data: dataAlerts } = useDepartamentsAlerts()

  return (
    <>
      {departamentosGeoJson.features
        .filter((depart) =>
          dataAlerts?.data?.some(
            (alert) => depart.properties.NOMBRE_DPT.toUpperCase() === alert.nombre.toUpperCase()
          )
        )
        .map((feature, index) => {
          const { color } = getDepartmentAlertInfo(dataAlerts, feature)
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
