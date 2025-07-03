import { baseUrls } from '@/lib'
import { useApiRequest } from '@/lib/hooks'
import { useQuery } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useCreateProcess = ({ infoProcess, basicDataProcess }) => {
  const bodyData = {
    idOfficeOrigin: infoProcess?.dependenciesSelected?.id,
    idProcessType: infoProcess?.processSelected?.id,
    description: infoProcess?.descriptionProcess,
    processData: {
      additionalData: basicDataProcess,
    },
  }
  const companyData = useStoreState((state) => state.company.companyData)
  const request = useApiRequest()
  const base = baseUrls.urlProcess
  const companyId = companyData?.companyId

  const qry = `/${companyId}/processes`
  return useQuery({
    queryKey: [qry],
    queryFn: async () => {
      try {
        const response = await request(base, qry, 'post', bodyData, null)
        return response
      } catch (error) {
        throw error
      }
    },
  })
}

export default useCreateProcess
