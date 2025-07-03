import { baseUrls, useApiRequest } from '@/lib'
import { useQuery } from '@tanstack/react-query'

const useComponent = ({ id = '', idApplication = '' }) => {
  const request = useApiRequest()
  const base = baseUrls.urlApps
  const qry = `/runtime/${idApplication}/component/${id}`
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
    enabled: !!id,
    refetchOnMount: 'always',
  })
}

export default useComponent
