import { baseUrls } from '@/lib'
import { useApiRequest } from '@/lib/hooks'
import { useQuery } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useEntitiesInfo = () => {
  const companyData = useStoreState((state) => state.company.companyData)
  const request = useApiRequest()
  const base = baseUrls.urlApps
  const qry = `/${companyData?.companyId}/generic-crud/entidades_externas`
  return useQuery({
    queryKey: [qry],
    queryFn: async () => {
      try {
        const response = await request(base, qry, 'get', null, null)
        return response
      } catch (error) {
        throw error
      }
    },
  })
}

export default useEntitiesInfo
