import { useMutation, useQueryClient } from '@tanstack/react-query'
import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'

const useUpdateTemplate = (queryParams) => {
  const request = useApiRequest()
  const userData = useStoreState((state) => state.user.userData)
  const idCompany = userData?.companies[0]?.companyId
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body) => {
      const base = baseUrls.urlDocuments
      const qry = `/${idCompany}/plantillas/${queryParams?.idTemplate}`
      try {
        const response = await request(base, qry, 'put', body, null)
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`/${idCompany}/plantillas`])
      toast.success('Plantilla actualizada con éxito')
    },
    onError: (error) => {
      toast.error('Error al subir la plantilla', error)
    },
  })
}

export default useUpdateTemplate
