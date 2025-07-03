import { baseUrls, useApiRequest } from '@/lib'
import { useQuery } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useGetFile = ({ params }) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)

  const base = baseUrls.urlDocuments
  const qry = `/${companyData?.companyId}/archivos/${params}`
  return useQuery({
    queryKey: [qry],
    enabled: !params || params === '' ? false : true,
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

export default useGetFile
