import { HeatMap } from '@/lib'
import { AlertDetail, Filters, Results } from '../components'

export const useAccordionsGeneralReport = ({
  setZoom,
  setCenter,
  form,
  onSubmit,
  loading,
  resultsVars,
  zoom,
  coorDepartamentos,
  coorMunicipios,
}) => {
  return [
    {
      name: 'filtros',
      title: 'Filtros',
      content: (
        <Filters
          setCenter={setCenter}
          setZoom={setZoom}
          form={form}
          onSubmit={onSubmit}
          loading={loading}
        />
      ),
    },
    {
      name: 'resultados',
      title: 'Resultados',
      content: <Results {...resultsVars} />,
    },
    {
      name: 'map',
      title: 'Mapa',
      content: (
        <HeatMap
          zoom={zoom}
          dataPolygon={coorDepartamentos?.data}
          markers={coorMunicipios?.data}
        />
      ),
    },
    {
      name: 'alertDetail',
      title: 'Alerta por detalle',
      content: <AlertDetail {...resultsVars.AlertDetail} />,
    },
  ]
}
