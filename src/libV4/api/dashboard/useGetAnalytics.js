import { useQueryDynamicApi } from '../useDynamicApi'

const useGetAnalytics = ({ qry, ...props }) => {
  return useQueryDynamicApi({
    baseKey: 'urlProcess',
    url: `/analytics${qry ?? ''}`,
    ...props,
  })
}

export default useGetAnalytics
