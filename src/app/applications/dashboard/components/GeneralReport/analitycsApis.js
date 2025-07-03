import { useMutationDynamicBaseUrl } from '@/lib'

export const useAlertCount = () => {
  const {
    mutateAsync: mutateAlertCount,
    isPending: loadingAlertCount,
    isError: errorAlertCount,
    data: infoAlertCount,
  } = useMutationDynamicBaseUrl({
    url: 'analytics/cantidadAlertas',
    baseKey: 'urlCgr',
    isCompanyRequest: 'true',
    method: 'get',
  })
  return { mutateAlertCount, infoAlertCount, loadingAlertCount, errorAlertCount }
}
export const useAlertValue = () => {
  const {
    mutateAsync: mutateAlertValue,
    isPending: loadingAlertValue,
    isError: errorAlertValue,
    data: infoAlertValue,
  } = useMutationDynamicBaseUrl({
    url: '/analytics/valorTotalAlertas',
    baseKey: 'urlCgr',
    isCompanyRequest: 'true',
    method: 'get',
  })
  return { mutateAlertValue, infoAlertValue, loadingAlertValue, errorAlertValue }
}

export const useAlertsByState = () => {
  const {
    mutateAsync: mutateAlertsByState,
    isPending: loadingAlertsByState,
    isError: errorAlertsByState,
    data: infoAlertsByState,
  } = useMutationDynamicBaseUrl({
    url: 'analytics/alertasPorEstado',
    baseKey: 'urlCgr',
    isCompanyRequest: 'true',
    method: 'get',
  })
  return { mutateAlertsByState, infoAlertsByState, loadingAlertsByState, errorAlertsByState }
}

export const useTotalProjects = () => {
  const {
    mutateAsync: mutateTotalProjects,
    isPending: loadingTotalProjects,
    isError: errorTotalProjects,
    data: infoTotalProjects,
  } = useMutationDynamicBaseUrl({
    url: 'analytics/cantidadProyectos',
    baseKey: 'urlCgr',
    isCompanyRequest: 'true',
    method: 'get',
  })
  return { mutateTotalProjects, infoTotalProjects, loadingTotalProjects, errorTotalProjects }
}
