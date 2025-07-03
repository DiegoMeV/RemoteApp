import { baseUrls } from '@/lib'
import { useApiRequest } from '@/lib/hooks'
import { useQuery } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useFiscalGroupsInfo = ({ id, moreProps } = {}) => {
  const request = useApiRequest()
  const base = baseUrls.urlFiscalizacion
  const companyData = useStoreState((state) => state.company.companyData)
  const idApplication = id ? `?idApplication=${id}` : ''
  const qry = `/${companyData?.companyId}/process-type-groups${idApplication}?status=all`
  return useQuery({
    queryKey: [qry],
    ...moreProps,
    queryFn: async ({ signal }) => {
      try {
        const response = await request(base, qry, 'get', null, {
          signal,
        })
        return response
      } catch (error) {
        throw error
      }
    },
  })
}

export default useFiscalGroupsInfo
