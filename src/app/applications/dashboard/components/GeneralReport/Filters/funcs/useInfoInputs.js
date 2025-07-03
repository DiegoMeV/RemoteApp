import { useBoolean, useQueryDynamicApi, useSearch } from '@/lib'
import { useStoreState } from 'easy-peasy'

export const useInfoInputs = ({ qry, baseKey }) => {
  const companyData = useStoreState((state) => state.company.companyData)
  const idCompany = companyData?.companyId
  const controlModal = useBoolean()
  const controlSearch = useSearch()
  let url = `${idCompany}${qry}`
  if (controlSearch.searchText) {
    url += `?palabraClave=${controlSearch.searchText}`
  }

  const { data: dataList, isLoading, isError } = useQueryDynamicApi({ url, baseKey })
  const data = {
    controlModal,
    controlSearch,
    dataList,
    isLoading,
    isError,
  }
  return data
}
