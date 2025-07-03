import { useCallback } from 'react'
import { useMutationDynamicBaseUrl } from '@/lib'
import toast from 'react-hot-toast'

const useDataComponents = ({
  idApplication,
  idCompany,
  idForm,
  model,
  setQueryData,
  restParams,
  nit_compania,
  searchParameter,
}) => {
  const {
    mutateAsync: getDataComponent,
    data: dataComponent,
    isPending: isLoadingComponent,
    isError,
  } = useMutationDynamicBaseUrl({
    baseKey: 'urlApps',
    url: `/runtime/${idApplication}/component/${idForm}`,
    isCompanyRequest: false,
    method: 'get',
    onSuccess: (e) => {
      fetchListForm(e)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al cargar los datos')
    },
  })

  const { mutateAsync: getListForm, isPending: isPendingList } = useMutationDynamicBaseUrl({
    baseKey: 'urlApps',
    isCompanyRequest: false,
    onSuccess: (e) => {
      setQueryData(e)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al cargar los datos')
    },
  })

  const fetchListForm = useCallback(
    (e) => {
      getListForm({
        methodBody: 'post',
        qry: `/runtime/${idCompany}/form/${
          e?.data?.[0]?.lastVersionInfo?.idComponent
        }/list?rowsPerPage=${model?.pageSize}&page=${model?.page + 1}`,
        body: {
          params: {
            nit_compania,
            busqueda: searchParameter.trim() !== '' ? searchParameter : '%',
            ...restParams,
          },
        },
      })
    },
    [getListForm, idCompany, model?.pageSize, model?.page, nit_compania, restParams]
  )

  return {
    getDataComponent,
    dataComponent,
    isLoadingComponent,
    isError,
    fetchListForm,
    isPendingList,
  }
}

export default useDataComponents
