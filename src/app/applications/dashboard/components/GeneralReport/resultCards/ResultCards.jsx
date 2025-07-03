import { useStoreState } from 'easy-peasy'
import { optionsDonut } from './funcs'
import { ViewResultCards } from './view'
import { formatColombianMoney } from '@/lib'

export const ResultCards = ({ apiData }) => {
  const dark = useStoreState((state) => state.darkTheme.dark)
  const labels = apiData?.infoAlertsByState?.labels ?? ''
  const optionsDonutAlertByStatus = optionsDonut({ dark, labels })
  const dataCards = [
    {
      title: 'Alertas',
      value: apiData?.error
        ? 'Error al cargar información'
        : apiData?.infoAlertCount?.cantidad_alertas ?? 'No se encontró información',
    },
    {
      title: 'Cantidad de proyectos',
      value: apiData?.error
        ? 'Error al cargar información'
        : apiData?.infoTotalProjects?.cantidad ?? '0',
    },
    {
      title: 'Valor total alertas',
      value: apiData?.error
        ? 'Error al cargar información'
        : apiData?.infoAlertValue?.total
        ? formatColombianMoney(apiData?.infoAlertValue?.total)
        : 0,
    },
  ]

  return (
    <ViewResultCards
      optionsDonutAlertByStatus={optionsDonutAlertByStatus}
      serieDonutAlertByStatus={apiData?.infoAlertsByState?.serieDonutAlertByStatus}
      errorApi={apiData?.error}
      isPending={apiData?.loading}
      dataCards={dataCards}
    />
  )
}
