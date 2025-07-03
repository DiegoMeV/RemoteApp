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

  const { optionsDonut: optionsByLastAct } = optionsDonutRequestManagement({
    infoCharts,
    type: 'process-by-last-activity',
    label: 'Total',
    dark,
  })
  const seriesByLastAct = infoCharts?.['process-by-last-activity']?.map(({ count = 0 }) => count)

  const seriesDbtType = infoCharts?.['process-debt-by-type']?.data ?? []
  const optionsDbtType =
    optionsColumnsMultibar(infoCharts?.['process-debt-by-type']?.categories) ?? {}

  const seriesByYear = infoCharts?.['processes-by-year']?.data ?? []
  const optionsColumnsMultibarGraph =
    optionsColumnsMultibar(infoCharts?.['processes-by-year']?.categories) ?? {}

  return {
    optionsByStatus,
    seriesByStatus,
    optionsByLastAct,
    seriesByLastAct,
    optionsDbtType,
    seriesDbtType,
    seriesByYear,
    optionsColumnsMultibarGraph,
  }
}

export const indicatorsFiles = ({ infoCharts, dark = 'light' } = {}) => {
  const {
    optionsByStatus,
    seriesByStatus,
    optionsByLastAct,
    seriesByLastAct,
    optionsDbtType,
    seriesDbtType,
    seriesByYear,
    optionsColumnsMultibarGraph,
  } = filtersCharts({ infoCharts, dark })

  return [
    {
      title: 'Expedientes por estado',
      type: 'donut',
      series: seriesByStatus || [''],
      options: optionsByStatus || {},
      height: 450,
      className: 'col-span-12 h-100% rounded-lg shadow-lg',
    },
    {
      title: 'Última gestión realizada',
      type: 'donut',
      series: seriesByLastAct || [''],
      options: optionsByLastAct || {},
      height: 450,
      className: 'col-span-12 h-100% rounded-lg shadow-lg',
    },
    {
      title: 'Deudas por tipo de proceso',
      type: 'bar',
      series: seriesDbtType || [''],
      options: optionsDbtType || {},
      height: 450,
      className: 'col-span-12 h-100% rounded-lg shadow-lg',
    },
    {
      title: 'Cantidad de expedientes',
      type: 'bar',
      series: seriesByYear || [''],
      options: optionsColumnsMultibarGraph || {},
      height: 450,
      className: 'col-span-12 h-100% rounded-lg shadow-lg',
    },
  ]
}
