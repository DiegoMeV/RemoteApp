import { useQueryDynamicApi } from '@/lib'
import { useEffect, useState } from 'react'
import { ViewAdvancedSearch } from './views'
import { useMutationDynamicBaseUrl, usePagination } from '@/libV4'
import toast from 'react-hot-toast'

const AdvancedSearch = () => {
  const [filterOptions, setFilterOptions] = useState()
  const [cursor, setCursor] = useState()

  const isDisabledSendToExcel = !filterOptions

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 50,
  })

  const {
    data: searchResults,
    refetch: refetchSearch,
    isFetching,
  } = useQueryDynamicApi({
    isCompanyRequest: true,
    url: '/processes/advanced-search',
    baseKey: 'urlFiscalizacion',
    method: 'post',
    body: { ...filterOptions, cursor, rowsPerPage: paginationModel?.pageSize },
    enabled: !!filterOptions,
  })

  const { mutateAsync: sendExcelToEmail, isPending: isGeneratingExcel } = useMutationDynamicBaseUrl(
    {
      isCompanyRequest: true,
      baseKey: 'urlFiscalizacion',
      url: `/processes/expedients/generate-xlsx`,
      method: 'post',
      onSuccess: (response) =>
        toast.success(
          `Estamos procesando la búsqueda. El Excel de expedientes se enviará a ${response?.data?.data?.user?.email} en cuanto esté listo`
        ),
      onError: (error) => toast.error('Error al cargar los expedientes', error),
    }
  )

  useEffect(() => {
    if (filterOptions) {
      refetchSearch()
    }
  }, [filterOptions, refetchSearch, cursor, paginationModel?.pageSize])

  const handleExportToExcel = () => {
    if (!filterOptions) {
      toast.error('No se puede exportar a Excel si no se ha seleccionado algun filtro')
      return
    }

    sendExcelToEmail({ body: { ...filterOptions } })
  }

  const { handlePaginationModelChange, rowCount } = usePagination(
    searchResults,
    isFetching,
    setCursor,
    paginationModel,
    setPaginationModel
  )

  return (
    // <AccessControl
    //   privilege='procesos.bandeja.busqueda_avanzada'
    //   nodeContent={<NoAccessCard />}
    // >
    <ViewAdvancedSearch
      searchResults={filterOptions ? searchResults : []}
      loadingResults={isFetching}
      setFilterOptions={setFilterOptions}
      setPaginationModel={setPaginationModel}
      isGeneratingExcel={isGeneratingExcel}
      handleExportToExcel={handleExportToExcel}
      isDisabledSendToExcel={isDisabledSendToExcel}
      pagination={{
        count: rowCount,
        page: paginationModel.page,
        rowsPerPage: paginationModel.pageSize,
        onPageChange: (_, page) =>
          handlePaginationModelChange({
            page: page,
            pageSize: paginationModel.pageSize,
          }),
        onRowsPerPageChange: (e) => {
          const rowsPerPage = parseInt(e.target.value, 10)
          handlePaginationModelChange({
            page: 0,
            pageSize: rowsPerPage,
          })
        },
      }}
    />
    // </AccessControl>
  )
}

export default AdvancedSearch
