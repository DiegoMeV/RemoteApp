import { useMutation } from '@tanstack/react-query'
import { useApiRequest } from '../../hooks'
import { baseUrls, toArray } from '@/lib'
import { useStoreActions } from 'easy-peasy'

const useUserInfo = (queryParams) => {
  const request = useApiRequest()
  const setUserData = useStoreActions((actions) => actions.user.setUserData)
  const setCompanyData = useStoreActions((state) => state.company.setCompanyData)

  return useMutation({
    mutationFn: async (body) => {
      const base = baseUrls.urlUsers
      const qry = '/auth/user'
      try {
        const response = await request(base, qry, 'get', body, null)
        const userData = toArray(response?.data?.[0])
        const companies = userData?.[0]?.companies ?? []
        await setUserData({
          ...userData?.[0],
          lastName: userData?.[0]?.lastName ?? '',
        })
        if (companies.length) {
          await setCompanyData(userData?.[0]?.companies?.[0])
        }
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}

export default useUserInfo
