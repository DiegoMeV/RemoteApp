import { useStoreState } from 'easy-peasy'
import { ViewAlertByCategory } from './view'
import { optionsRiskCriterionChart } from '../RiskCriterionAlert/funcs'
import { removeUndefinedAndNullValues, useGetAnalyticsModule } from '@/lib'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

const AlertByCategory = ({ params }) => {
  const dark = useStoreState((state) => state.darkTheme.dark)
  const {
    mutateAsync: getCountAlert,
    isPending,
    data: infoCategory,
  } = useGetAnalyticsModule({
    onError: (error) => {
      toast.error(
        error.response?.data?.error ?? 'Error al cargar las alertas por criterio de riesgo'
      )
    },
  })

  useEffect(() => {
    getCountAlert({ qry: `/alertasPorCategoria?${params}`, type: 'alertasPorCategoria' })
  }, [getCountAlert, params])
  const labels = infoCategory?.result?.data?.labels ?? []
  const labelsFiltered = removeUndefinedAndNullValues(labels)
  const optionByCategory = optionsRiskCriterionChart(dark, labelsFiltered)
  const seriesByCategory = infoCategory?.result?.data?.series ?? []
  return (
    <ViewAlertByCategory
      optionByCategory={optionByCategory}
      seriesByCategory={seriesByCategory}
      isPending={isPending}
    />
  )
}

export default AlertByCategory
