import {
  AlertByActor,
  AlertByCategory,
  AlertByModel,
  AlertBySocialization,
  DetailAlert,
  FilterModelReport,
  HeatMap,
  ResultCards,
  RiskCriterionAlert,
} from '../components/GeneralReport'

export const accordionGeneralReportData = ({ center, zoom, form, onSubmit, apiData, params }) => {
  return [
    {
      name: 'Filtros',
      title: 'Filtros',
      content: (
        <FilterModelReport
          form={form}
          onSubmit={onSubmit}
        />
      ),
    },
    { name: 'resultados', title: 'Resultados', content: <ResultCards apiData={apiData.results} /> },
    {
      name: 'heatMap',
      title: 'Mapa de calor',
      content: (
        <HeatMap
          center={center}
          zoom={zoom}
        />
      ),
    },
    { name: 'modelAlert', title: 'Alertas por modelo', content: <AlertByModel params={params} /> },
    { name: 'detailAlert', title: 'Alertas por detalle', content: <DetailAlert params={params} /> },
    {
      name: 'recipientAlert',
      title: 'Alertas por destinatario',
      content: <AlertByActor params={params} />,
    },
    {
      name: 'riskCriteriaAlert',
      title: 'Alertas por criterio de riesgo',
      content: <RiskCriterionAlert params={params} />,
    },
    {
      name: 'categoryAlertNumber',
      title: 'Número de alertas por categoría',
      content: <AlertByCategory params={params} />,
    },
    {
      name: 'alertBySocializationDate',
      title: 'Alerta por fecha de Socialización',
      content: <AlertBySocialization params={params} />,
    },
  ]
}
