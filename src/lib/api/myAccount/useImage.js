import { baseUrls, useApiRequest } from '@/lib'
import { useQuery } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useImage = (idImage, moreProps = {}) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  const base = baseUrls.urlDocuments
  const qry = `/${companyData?.companyId}/archivos/${idImage}`
  return useQuery({
    queryKey: [qry],
    enabled: !idImage || idImage === '' ? false : true,
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
    ...moreProps,
  })
}

export default useImage
