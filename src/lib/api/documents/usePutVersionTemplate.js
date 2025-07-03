import { useMutation } from '@tanstack/react-query'
import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const usePutVersionTemplate = (props) => {
  const request = useApiRequest()
  const userData = useStoreState((state) => state.user.userData)
  const idCompany = userData?.companies[0]?.companyId
  return useMutation({
    mutationFn: async (body) => {
      const base = baseUrls.urlDocuments
      const qry = `/${idCompany}/plantillas/${props?.idTemplate}/versiones/${props?.idVersion}`
      try {
        const response = await request(base, qry, 'put', body, null)
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: props.onSuccess,
    onError: props.ponError,
  })
}

export default usePutVersionTemplate
