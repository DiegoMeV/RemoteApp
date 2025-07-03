import { useQueryDynamicApi } from '../useDynamicApi'

const useGetDocument = ({ qry, ...rest }) => {
  return useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlDocuments',
    url: `documentos${qry}`,
    ...rest,
  })
}

export default useGetDocument
