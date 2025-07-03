import { useQueryDynamicApi } from '../useDynamicApi'

const useGetUsers = ({ qry, ...props }) => {
  return useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlUsers',
    url: `users${qry ?? ''}`,
    ...props,
  })
}

export default useGetUsers
