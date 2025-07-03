import { useQueryDynamicApi } from '../useDynamicApi'

const useGetProcessTypeGroups = ({ qry, ...props }) => {
  return useQueryDynamicApi({
    baseKey: 'urlProcess',
    url: `/process-type-groups${qry ?? ''}`,
    ...props,
  })
}

export default useGetProcessTypeGroups
