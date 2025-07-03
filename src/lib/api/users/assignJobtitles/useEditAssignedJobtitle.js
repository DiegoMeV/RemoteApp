import { useMutation } from '@tanstack/react-query'
import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useEditAssignedJobtitle = (queryParams) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  return useMutation({
    mutationFn: async (body) => {
      const base = baseUrls.urlUsers
      const qry = `/${companyData?.companyId}/users/${queryParams.idUser}/jobTitles/${body.joinJobTitleId}`
      try {
        const response = await request(base, qry, 'put', { finishedAt: body.finishedAt }, null)
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}

export default useEditAssignedJobtitle
