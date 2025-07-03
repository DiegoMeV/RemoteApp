import { useMutation } from '@tanstack/react-query'

import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useProcessAlertsCreation = (queryParams) => {
  const base = baseUrls.urlCgr
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  return useMutation({
    mutationFn: async ({ id, estado, comentario }) => {
      const qry = `/${companyData?.companyId}/alertasProceso/${id}`
      const response = await request(base, qry, 'put', { estado, comentario }, null)
      return response
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}

export default useProcessAlertsCreation
