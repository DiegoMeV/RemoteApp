import { useStoreState } from 'easy-peasy'
import { ViewRiskCriterionAlert } from './view'
import { optionsRiskCriterionChart } from './funcs'
import toast from 'react-hot-toast'
import { removeUndefinedAndNullValues, useGetAnalyticsModule } from '@/lib'
import { useEffect } from 'react'

const RiskCriterionAlert = ({ params }) => {
  const dark = useStoreState((state) => state.darkTheme.dark)
  const {
    mutateAsync: getCountAlert,
    isPending,
    data: infoCriterion,
  } = useGetAnalyticsModule({
    onError: (error) => {
      toast.error(
        error.response?.data?.error ?? 'Error al cargar las alertas por criterio de riesgo'
      )
    },
  })

  useEffect(() => {
    getCountAlert({
      qry: `/alertasPorCriteriosRiesgo?${params}`,
      type: 'alertasPorCriteriosRiesgo',
    })
  }, [getCountAlert, params])
  const labels = infoCriterion?.result?.data?.labels ?? []
  const labelsFiltered = removeUndefinedAndNullValues(labels)
  const optionsRiskCriterion = optionsRiskCriterionChart(dark, labelsFiltered)
  const seriesRiskCriterion = infoCriterion?.result?.data?.series ?? []
  return (
    <ViewRiskCriterionAlert
      optionsRiskCriterion={optionsRiskCriterion}
      seriesRiskCriterion={seriesRiskCriterion}
      isPending={isPending}
    />
  )
}

export default RiskCriterionAlert
