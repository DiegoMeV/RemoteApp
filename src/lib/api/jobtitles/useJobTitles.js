import { useQueryDynamicApi } from '@/lib'

const useJobTitles = ({ qry, ...queryParams }) => {
  return useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlUsers',
    url: `jobTitles/${qry}`,
    ...queryParams,
  })
}

export default useJobTitles
