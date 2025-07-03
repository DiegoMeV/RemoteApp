import { useQueryDynamicApi } from '../useDynamicApi'

const useGetTemplate = ({ qry, ...rest }) => {
  return useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlDocuments',
    url: `plantillas${qry}`,
    ...rest,
  })
}

export default useGetTemplate
