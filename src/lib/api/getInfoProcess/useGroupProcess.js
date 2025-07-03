import { useQuery } from '@tanstack/react-query'
import { useApiRequest } from '../../hooks'
import { baseUrls } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useGroupProcess = () => {
  const userData = useStoreState((state) => state.user.userData)

  const request = useApiRequest()
  const baseUrl = baseUrls.urlProcess
  const qry = `/${userData?.companies?.[0].companyId}/inbox/summary`
  return useQuery({
    queryKey: [`/${userData?.companies?.[0].companyId}/inbox/summary`],
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

export default useGroupProcess
