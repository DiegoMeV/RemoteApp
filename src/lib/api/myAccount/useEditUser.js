import { useMutation } from '@tanstack/react-query'

import { baseUrls, useApiRequest } from '@/lib'

const useEditUser = (queryParams) => {
  const base = baseUrls.urlUsers
  const request = useApiRequest()
  const qry = `/${queryParams?.idCompanyAccess}/users`

  return useMutation({
    mutationFn: async (body) => {
      const response = await request(base, qry, 'put', body, null)

      return response
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}

export default useEditUser
