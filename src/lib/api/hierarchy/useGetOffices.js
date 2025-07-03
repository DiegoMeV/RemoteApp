import { useQueryDynamicApi } from '../useDynamicApi'

const useGetOffices = ({ qry, ...props } = {}) => {
  return useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlUsers',
    url: `/hierarchy${qry ?? ''}`,
    ...props,
  })
}

export default useGetOffices
