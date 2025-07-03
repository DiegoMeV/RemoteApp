import { useQueryDynamicApi } from '../useDynamicApi'

const useGetProcessTypes = ({ qry, ...props }) => {
  return useQueryDynamicApi({
    baseKey: 'urlProcess',
    url: `/process-types${qry ?? ''}`,
    ...props,
  })
}

export default useGetProcessTypes
