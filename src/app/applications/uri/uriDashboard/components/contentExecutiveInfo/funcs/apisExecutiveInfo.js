import { useMutationDynamicBaseUrl } from '@/lib'

export const useExecutiveInfo = () => {
  const {
    mutateAsync: mutateExecutiveInfo,
    isPending: loadingExecutiveInfo,
    isError: errorExecutiveInfo,
    data: infoExecutiveInfo,
  } = useMutationDynamicBaseUrl({
    url: `analytics/infoTablaUri`,
    baseKey: 'urlCgr',
    isCompanyRequest: 'true',
    method: 'get',
  })
  return { mutateExecutiveInfo, infoExecutiveInfo, loadingExecutiveInfo, errorExecutiveInfo }
}
