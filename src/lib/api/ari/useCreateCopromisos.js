import { useMutation } from '@tanstack/react-query'
import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useCreateCopromisos = (queryParams) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  const base = baseUrls.urlCgr
  const companyid = companyData?.companyId || ''
  const id = queryParams.id ? queryParams.id : ''
  const qry = `/${companyid}/compromisosAri${id}`

  return useMutation({
    mutationFn: async (body) => {
      try {
        const response = await request(base, qry, queryParams.type, body, null)
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}

export default useCreateCopromisos
