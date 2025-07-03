import { useQueryDynamicApi } from '@/lib'

const useGetRoles = ({ qry, ...rest }) => {
  return useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlUsers',
    url: `roles${qry}`,
    ...rest,
  })
}

export default useGetRoles
