import { useApiRequest } from '../../hooks'
import { baseUrls } from '../../constants'
import { useMutation } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useMutationDynamicBaseUrl = ({
  url = null,
  baseKey = null,
  method = 'post',
  isCompanyRequest = true,
  companyId,
  includeFile = false,
  ...queryOptions
}) => {
  const request = useApiRequest(includeFile)
  const userData = useStoreState((state) => state.user.userData)

  const idCompany = companyId ?? userData?.companies?.[0]?.companyId

  let base = baseUrls[baseKey] || ''

  if (isCompanyRequest) {
    base += `/${idCompany}`
  }

  return useMutation({
    mutationFn: async ({ qry, methodBody, body, replaceUrl = '' } = {}) => {
      const newURl = `${url ?? ''}${qry ?? ''}`
      try {
        const response = await request(
          base,
          replaceUrl && replaceUrl?.trim() !== '' ? replaceUrl : newURl,
          methodBody ?? method,
          body ?? null,
          null
        )
        return response
      } catch (error) {
        throw error
      }
    },
    ...queryOptions,
  })
}

export default useMutationDynamicBaseUrl
