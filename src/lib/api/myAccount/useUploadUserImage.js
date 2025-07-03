import { useMutation } from '@tanstack/react-query'

import { baseUrls, useApiRequest } from '@/lib'

const useUploadUserImage = (queryParams) => {
  const request = useApiRequest()
  const base = baseUrls.urlDocuments
  const qry = `/${queryParams.idCompanyAccess}/documentos/uploadImage`

  return useMutation({
    mutationFn: async ({ file }) => {
      const body = new FormData()
      body.append('file', file[0])

      const response = await request(base, qry, 'post', body, null)

      return response
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}

export default useUploadUserImage
