import { useQuery } from '@tanstack/react-query'
import { useApiRequest } from '../../hooks'
import { baseUrls } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useTemplates = ({ searchTemplate, cursor }) => {
  const userData = useStoreState((state) => state.user.userData)
  const idCompany = userData?.companies[0]?.companyId

  const request = useApiRequest()
  const baseUrl = baseUrls.urlDocuments
  const qry =
    searchTemplate !== ''
      ? `/${idCompany}/plantillas?rowsPerPage=20&cursor=${
          cursor ?? ''
        }&querySearch=${searchTemplate}`
      : `/${idCompany}/plantillas?rowsPerPage=20&cursor=${cursor ?? ''}`
  return useQuery({
    queryKey: [qry],
    queryFn: async ({ signal }) => {
      try {
        const response = await request(baseUrl, qry, 'get', null, { signal })
        return response
      } catch (error) {
        throw error
      }
    },
  })
}

export default useTemplates
