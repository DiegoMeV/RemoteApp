import { useQueryDynamicApi } from '../useDynamicApi'

const useGetUser = ({ qry, ...props }) => {
  return useQueryDynamicApi({
    baseKey: 'urlUsers',
    url: `/users${qry ?? ''}`,
    ...props,
  })
}

export default useGetUser
