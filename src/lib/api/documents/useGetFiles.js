import { useQueryDynamicApi } from '../useDynamicApi'

const useGetFiles = ({ qry, ...rest }) => {
  return useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlDocuments',
    url: `archivos${qry}`,
    ...rest,
  })
}

export default useGetFiles
