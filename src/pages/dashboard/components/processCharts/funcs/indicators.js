import { optionsColumnsMultibar } from '@/app/dashboard/func'
import optionsDonutRequestManagement from '@/app/dashboard/func/optionsDonutRequestManagement'

const filtersCharts = ({ infoCharts, dark = 'light' } = {}) => {
  const { optionsDonut: optionsByStatus } = optionsDonutRequestManagement({
    infoCharts,
    type: 'processes-by-status',
    label: 'Total',
    dark,
  })
  const seriesByStatus = infoCharts?.['processes-by-status']?.map(({ count = 0 }) => count)

  // Function to map the label of the donut chart
  const mappingLabel = ({ assignedUserData = {} }) =>
    `${assignedUserData?.firstName ?? 'Usuario'} ${assignedUserData?.lastName ?? 'Sistema'}`

  const { optionsDonut: chartbarByOfficials } = optionsDonutRequestManagement({
    infoCharts,
    type: 'processes-by-assigned-user',
    label: 'Total',
    dark,
    funcLabel: mappingLabel,
  })

  const seriesByOfficials = infoCharts?.['processes-by-assigned-user']?.map(
    ({ count = 0 }) => count
  )

  const data = infoCharts?.['processes-by-type']?.data?.map((item) => ({ ...item, name: 'Total' }))
  const seriesByType = data
  const optionsColumnsByType = optionsColumnsMultibar(infoCharts?.['processes-by-type']?.categories)

  const seriesByYear = infoCharts?.['processes-by-year']?.data
  const optionsColumnsMultibarGraph = optionsColumnsMultibar(
    infoCharts?.['processes-by-year']?.categories
  )

  return {
    optionsByStatus,
    seriesByStatus,
    chartbarByOfficials,
    seriesByOfficials,
    seriesByType,
    optionsColumnsByType,
    seriesByYear,
    optionsColumnsMultibarGraph,
  }
}

export const indicatorsFiles = ({ infoCharts, dark = 'light' } = {}) => {
  const {
    optionsByStatus,
    seriesByStatus,
    chartbarByOfficials,
    seriesByOfficials,
    seriesByType,
    optionsColumnsByType,
    seriesByYear,
    optionsColumnsMultibarGraph,
  } = filtersCharts({ infoCharts, dark })

  return [
    {
      title: 'Procesos por estado',
      type: 'donut',
      series: seriesByStatus || [''],
      options: optionsByStatus || {},
      height: 450,
      className: 'col-span-12 h-100% rounded-lg shadow-lg',
    },
    {
      title: 'Procesos por funcionarios',
      type: 'donut',
      series: seriesByOfficials || [''],
      options: chartbarByOfficials || {},
      height: 450,
      className: 'col-span-12 h-100% rounded-lg shadow-lg',
    },
    {
      title: 'Tipos de procesos',
      type: 'bar',
      series: seriesByType || [''],
      options: optionsColumnsByType || {},
      height: 450,
      className: 'col-span-12 h-100% rounded-lg shadow-lg',
    },
    {
      title: 'Cantidad de procesos',
      type: 'bar',
      series: seriesByYear || [''],
      options: optionsColumnsMultibarGraph || {},
      height: 450,
      className: 'col-span-12 h-100% rounded-lg shadow-lg',
    },
  ]
}
