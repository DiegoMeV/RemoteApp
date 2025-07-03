import { useBoolean, useQueryDynamicApi, useSearch } from '@/lib'
import { useStoreState } from 'easy-peasy'

export const useInfoInputs = ({ qry, baseKey, idCompanyUrl, searchQry, qryParams, enabled }) => {
  const companyData = useStoreState((state) => state.company.companyData)
  const idCompany = idCompanyUrl ?? companyData?.companyId
  const controlModal = useBoolean()
  const controlSearch = useSearch()
  // if (enabled === undefined) {
  //   if (controlSearch.searchText?.length > 0) {
  //     enabled = true
  //   } else if (controlModal.show === true) {
  //     enabled = true
  //   } else {
  //     enabled = false
  //   }
  // } Este enabled no me deja traer los default values

  let url = `${idCompany}${qry}`
  if (qryParams) {
    url += `?${qryParams}`
  }
  if (controlSearch.searchText) {
    url += searchQry
      ? qryParams
        ? `&${searchQry}=${controlSearch.searchText}`
        : `?${searchQry}=${controlSearch.searchText}`
      : qryParams
      ? `&palabraClave=${controlSearch.searchText}`
      : `?palabraClave=${controlSearch.searchText}`
  }

  const { data: dataList, isFetching, isError } = useQueryDynamicApi({ url, baseKey, enabled })
  const data = {
    controlModal,
    controlSearch,
    dataList,
    isLoading: isFetching,
    isError,
  }
  return data
}
