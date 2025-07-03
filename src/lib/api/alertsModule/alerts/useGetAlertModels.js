import { useQueryDynamicApi } from '../../useDynamicApi'

const useGetAlertModels = ({ qry, ...props } = {}) => {
  return useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    url: `/modelosAlertas${qry ?? ''}`,
    ...props,
  })
}

export default useGetAlertModels
