import { baseUrls, useApiRequest } from '@/lib'
import { useQuery } from '@tanstack/react-query'
import { useRootStore } from '../../store'

const useGetApplications = () => {
  const { companyData } = useRootStore()
  const request = useApiRequest()
  const idCompany = companyData?.companyId
  const base = baseUrls.urlUsers
  const qry = `/${idCompany}/apps`

  return useQuery({
    queryKey: [qry],
    // enabled: baseUrls.urlApps.includes('apps'),
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

export default useGetApplications
