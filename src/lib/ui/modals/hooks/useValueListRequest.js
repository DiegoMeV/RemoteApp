import { useState, useMemo } from 'react'
import { useQueryDynamicApi } from '@/lib/api'
import { buildQueryPaginationValueListCursor, buildQueryPaginationValueListPage } from '@/lib/funcs'
import { useSearch } from '@/lib/components'

const useValueListRequest = (valueList) => {
  const searchParam = useSearch()
  const [cursor, setCursor] = useState()
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 50,
  })
  const handleClearPaginationModel = () => {
    setPaginationModel({ page: 0, pageSize: 50 })
  }

  const handlePaginationModelChangePage = (model) => {
    setPaginationModel(model)
  }

  const queryCursor = buildQueryPaginationValueListCursor(
    paginationModel?.pageSize,
    cursor,
    searchParam.searchText
  )

  const queryPage = buildQueryPaginationValueListPage(
    paginationModel?.pageSize,
    paginationModel?.page,
    searchParam.searchText
  )

  const query = valueList?.paginationType === 'page' ? queryPage : queryCursor

  const url =
    query && valueList?.requestParams
      ? `${valueList.requestParams?.url}${query}`
      : valueList?.requestParams?.url

  const rowsRequest = useQueryDynamicApi({
    enabled: !!valueList?.requestParams,
    refetchOnMount: true,
    ...valueList?.requestParams,
    url,
  })

  const rows = useMemo(() => {
    return rowsRequest?.data?.data ?? valueList?.rows?.data ?? []
  }, [rowsRequest?.data, valueList?.rows?.data])

  const loading = rowsRequest?.isLoading ?? rowsRequest?.isFetching ?? valueList?.loading ?? false

  const rowCountStatePage =
    valueList?.rows?.paginacion?.total ?? rowsRequest?.data?.paginacion?.total ?? 0

  return {
    searchParam,
    cursor,
    setCursor,
    paginationModel,
    setPaginationModel,
    handlePaginationModelChangePage,
    rowCountStatePage,
    rows,
    loading,
    rowsRequest,
    handleClearPaginationModel,
  }
}

export default useValueListRequest
