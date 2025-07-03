import { useQueryDynamicApi } from '../useDynamicApi'

const useGetRole = ({ qry, ...props }) => {
  return useQueryDynamicApi({
    baseKey: 'urlUsers',
    url: `/roles${qry ?? ''}`,
    ...props,
  })
}

export default useGetRole
