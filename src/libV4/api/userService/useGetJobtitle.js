import { useQueryDynamicApi } from '../useDynamicApi'

const useGetJobtitle = ({ qry, ...props }) => {
  return useQueryDynamicApi({
    baseKey: 'urlUsers',
    url: `/jobTitles${qry ?? ''}`,
    ...props,
  })
}

export default useGetJobtitle
