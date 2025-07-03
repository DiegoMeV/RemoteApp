import { baseUrls } from '@/lib'
import { useApiRequest } from '@/lib/hooks'
import { useQuery } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useGetProcessInitOptions = () => {
  const request = useApiRequest()
  const base = baseUrls.urlProcess
  const companyData = useStoreState((state) => state.company.companyData)
  const qry = `/${companyData?.companyId}/inbox/process-init-options`
  return useQuery({
    queryKey: [qry],
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

export default useGetProcessInitOptions
