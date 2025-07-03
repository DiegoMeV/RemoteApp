import { useMutationDynamicBaseUrl } from '@/lib'

export const useActiveAcctApi = () => {
  const {
    mutateAsync: mutateActiveAcct,
    isPending: loadingActiveAcct,
    isError: errorActiveAcct,
    data: infoActiveAcct,
  } = useMutationDynamicBaseUrl({
    url: 'analytics/actuacionActiva',
    baseKey: 'urlCgr',
    isCompanyRequest: 'true',
    method: 'get',
  })
  return { mutateActiveAcct, infoActiveAcct, loadingActiveAcct, errorActiveAcct }
}

export const useSectorApi = () => {
  const {
    mutateAsync: mutateSector,
    isPending: loadingSector,
    isError: errorSector,
    data: infoSector,
  } = useMutationDynamicBaseUrl({
    url: 'analytics/sectorAlertado',
    baseKey: 'urlCgr',
    isCompanyRequest: 'true',
    method: 'get',
  })
  return { mutateSector, loadingSector, errorSector, infoSector }
}

export const useMonitoringByRegion = () => {
  const {
    mutateAsync: mutateMonitoringByRegion,
    isPending: loadingMonitoringByRegion,
    isError: errorMonitoringByRegion,
    data: infoMonitoringByRegion,
  } = useMutationDynamicBaseUrl({
    url: 'analytics/seguimientoRegion',
    baseKey: 'urlCgr',
    isCompanyRequest: 'true',
    method: 'get',
  })
  return {
    mutateMonitoringByRegion,
    loadingMonitoringByRegion,
    errorMonitoringByRegion,
    infoMonitoringByRegion,
  }
}

export const useAlertDetail = () => {
  const {
    mutateAsync: mutateAlertDetail,
    isPending: loadingAlertDetail,
    isError: errorAlertDetail,
    data: infoAlertDetail,
  } = useMutationDynamicBaseUrl({
    url: 'analytics/regionalizacion',
    baseKey: 'urlCgr',
    isCompanyRequest: 'true',
    method: 'get',
  })
  return {
    mutateAlertDetail,
    loadingAlertDetail,
    errorAlertDetail,
    infoAlertDetail,
  }
}
