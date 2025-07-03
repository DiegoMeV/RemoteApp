import { buildQueryWithPagination } from '@/lib/funcs'
import { useQueryDynamicApi } from '../useDynamicApi'

const useGetSubseriesTRD = ({ pageSize, cursor, searchText, queryprops }) => {
  const qry = buildQueryWithPagination(pageSize, cursor, searchText)

  return useQueryDynamicApi({
    baseKey: 'urlDocuments',
    isCompanyRequest: true,
    url: `/tablaRetencion/subSeries${qry}`,
    ...queryprops,
  })
}

export default useGetSubseriesTRD
