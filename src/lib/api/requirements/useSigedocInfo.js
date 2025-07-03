import { baseUrls, useApiRequest } from '@/lib'
import { useQuery } from '@tanstack/react-query'

const useSigedocInfo = (queryParams) => {
  const request = useApiRequest()
  
  const base = baseUrls.urlCgrInt
  
  const qry = `/SIGEDOC/consultar/radicado/${queryParams.id}`

  return useQuery({
    queryKey: [`/SIGEDOC/consultar/radicado/${queryParams.id}`],
    enabled: !!queryParams.id,
    queryFn: async () => {
      try {
        const response = await request(base, qry, 'get', null, null)
        return response
      } catch (error) {
        throw error
      }
    }
  })
}

export default useSigedocInfo
