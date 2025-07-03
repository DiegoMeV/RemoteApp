import { useQueryDynamicApi } from '../useDynamicApi'

const useGetProcess = ({ qry, ...props }) => {
  return useQueryDynamicApi({
    baseKey: 'urlProcess',
    url: `/processes${qry ?? ''}`,
    ...props,
  })
}

export default useGetProcess
