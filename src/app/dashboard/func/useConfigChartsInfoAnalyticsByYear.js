import optionsColumnsMultibar from './optionsColumnsMultibar'

const useConfigChartsInfoAnalyticsByYear = ({
  infoProcessesByComplexityGroup,
  isLoadingProcessesByComplexityGroup,
}) => {
  const optionsColumnsMultibarGraph = optionsColumnsMultibar(
    infoProcessesByComplexityGroup?.categories
  )
  const loading = isLoadingProcessesByComplexityGroup
  const byYear = [
    {
      title: 'Cantidad de solicitudes',
      type: 'bar',
      series: infoProcessesByComplexityGroup?.data,
      options: optionsColumnsMultibarGraph,
      height: '400px',
      md: 12,
    },
  ]
  return { byYear, loading }
}
export default useConfigChartsInfoAnalyticsByYear
