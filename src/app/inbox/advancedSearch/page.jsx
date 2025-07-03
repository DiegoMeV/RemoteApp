import { useEffect, useState } from 'react'
import { ViewAdvancedSearch } from './views'
import { NoAccessCard, useQueryDynamicApi } from '@/lib'
import { AccessControl, usePagination } from '@/libV4'

const AdvancedSearch = () => {
  const [filterOptions, setFilterOptions] = useState()
  const [cursor, setCursor] = useState()

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 50,
  })

  const {
    data: searchResults,
    isLoading: loadingResults,
    refetch: refetchSearch,
    isFetching,
  } = useQueryDynamicApi({
    url: '/processes/advanced-search',
    baseKey: 'urlProcess',
    method: 'post',
    isCompanyRequest: true,
    body: { ...filterOptions, cursor, rowsPerPage: paginationModel?.pageSize },
    enabled: !!filterOptions,
  })

  useEffect(() => {
    if (filterOptions) {
      refetchSearch()
    }
  }, [filterOptions, refetchSearch, cursor])

  const pagination = usePagination(
    searchResults,
    loadingResults,
    setCursor,
    paginationModel,
    setPaginationModel
  )

  const resetPagination = () => {
    setCursor()
    setPaginationModel({ page: 0, pageSize: 50 })
  }

  return (
    <AccessControl
      privilege='procesos.bandeja.busqueda_avanzada'
      nodeContent={<NoAccessCard />}
    >
      <ViewAdvancedSearch
        searchResults={filterOptions ? searchResults : []}
        loadingResults={loadingResults || isFetching}
        setFilterOptions={setFilterOptions}
        pagination={{ paginationModel, ...pagination }}
        resetPagination={resetPagination}
      />
    </AccessControl>
  )
}

export default AdvancedSearch
