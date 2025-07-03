// PENDIENTE PARA ELIMINAR
import { baseUrls, useApiRequest } from '@/lib'
import { useQuery } from '@tanstack/react-query'

const useGetActorsType = ({ enabled = true } = {}) => {
  const request = useApiRequest()
  const base = baseUrls.urlProcess

  const qry = `/actor-types`

  return useQuery({
    queryKey: [qry],
    enabled: enabled,
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

export default useGetActorsType
