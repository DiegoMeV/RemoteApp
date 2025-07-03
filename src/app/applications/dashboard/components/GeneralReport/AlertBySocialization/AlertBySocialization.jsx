import { useStoreState } from 'easy-peasy'
import { optionsLineSyncing } from './funcs'
import { ViewAlertBySocialization } from './view'
import { removeUndefinedAndNullValues, useGetAnalyticsModule } from '@/lib'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

const AlertBySocialization = ({ params }) => {
  const dark = useStoreState((state) => state.darkTheme.dark)
  const {
    mutateAsync: getCountAlert,
    isPending,
    data: infoSocialization,
  } = useGetAnalyticsModule({
    onError: (error) => {
      toast.error(
        error.response?.data?.error ?? 'Error al cargar las alertas por fecha de socialización'
      )
    },
  })

  useEffect(() => {
    getCountAlert({
      qry: `/alertasPorFechaSocializacion?${params}`,
      type: 'alertasPorFechaSocializacion',
    })
  }, [getCountAlert, params])
  const optionsAlertSocialization = optionsLineSyncing({
    dark,
    labels: removeUndefinedAndNullValues(infoSocialization?.result?.data?.labels),
  })
  const serieAlertSocialization = infoSocialization?.result?.data?.series ?? []

  return (
    <ViewAlertBySocialization
      optionsAlertSocialization={optionsAlertSocialization}
      serieAlertSocialization={serieAlertSocialization}
      isPending={isPending}
    />
  )
}

export default AlertBySocialization
