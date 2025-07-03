// PENDIENTE DE ELIMINAR
import { useApiRequest } from '@/lib'
import { useQuery } from '@tanstack/react-query'

const useDocumentsSignTemplates = ({ url }) => {
  const request = useApiRequest()

  const { base, qry } = url

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

export default useDocumentsSignTemplates
