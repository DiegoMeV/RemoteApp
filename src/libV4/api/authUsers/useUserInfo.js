import { useApiRequest } from '../../hooks'
import { useMutation } from '@tanstack/react-query'
import { baseUrls } from '../../constants'
import { toArray } from '../../utils'
import { useRootStore } from '../../store'
import { useStoreActions } from 'easy-peasy'

const useUserInfo = (queryParams) => {
  const request = useApiRequest()
  const { setUserData, setCompanyData } = useRootStore()

  /* TODO: Eliminar para solo utilizar zustand */
  const setUserDataPeasy = useStoreActions((actions) => actions.user.setUserData)
  const setCompanyDataPeasy = useStoreActions((state) => state.company.setCompanyData)

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
        // TODO: Eliminar para solo utilizar zustand
        await setUserDataPeasy({
          ...userData?.[0],
          lastName: userData?.[0]?.lastName ?? '',
        })
        if (companies.length === 1) {
          await setCompanyData(userData?.[0]?.companies?.[0])
          await setCompanyDataPeasy(userData?.[0]?.companies?.[0])
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
