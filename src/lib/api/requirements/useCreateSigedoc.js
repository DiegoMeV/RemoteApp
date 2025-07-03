import { useMutation } from '@tanstack/react-query'

import { useApiRequest } from '../../hooks'
import { baseUrls } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useCreateSigedoc = (queryParams) => {
  const companyData = useStoreState((state) => state.company.companyData)
  const request = useApiRequest()

  const base = baseUrls.urlCgrInt

  const qry = `/${companyData?.companyId}/SIGEDOC/comunicacion/interna-enviada`

  return useMutation({
    mutationFn: async (body) => {
      try {
        const response = await request(base, qry, 'post', body, null)
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}

export default useCreateSigedoc
