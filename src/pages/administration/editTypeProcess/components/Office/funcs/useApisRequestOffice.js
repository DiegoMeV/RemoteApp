import { useMutationDynamicBaseUrl, useQueryDynamicApi } from '@/lib'
import { GridRowModes } from '@mui/x-data-grid-premium'
import toast from 'react-hot-toast'

export const useApisRequestOffice = ({
  idProcessType,
  setNewRow,
  setRowModesModel,
  rowModesModel,
  rowSelected,
  searchHierarchy,
}) => {
  const {
    data: offices,
    isFetching: loadingOffices,
    isError: errorOffices,
    refetch: refetchOffice,
  } = useQueryDynamicApi({
    url: `/process-types/${idProcessType}/for-office?inclOffice=true`,
    isCompanyRequest: true,
    baseKey: 'urlProcess',
  })
  const { data: Hierarcy, isFetching: loadingHierarcy } = useQueryDynamicApi({
    url: searchHierarchy?.searchText
      ? `/hierarchy?querySearch=${searchHierarchy?.searchText}`
      : `/hierarchy`,
    isCompanyRequest: true,
    baseKey: 'urlUsers',
  })
  const { mutateAsync: createOfficeProcess, isPending: loadingCreateOffice } =
    useMutationDynamicBaseUrl({
      url: `/process-types/${idProcessType}/for-office`,
      baseKey: 'urlProcess',
      isCompanyRequest: true,
      onSuccess: () => {
        toast.success('Dependencia asociada al tipo de proceso con éxito')
        refetchOffice()
        setNewRow(false)
      },
      onError: (e) => {
        setRowModesModel({ ...rowModesModel, [rowSelected]: { mode: GridRowModes.Edit } })
        toast.error(
          e?.response?.data?.error ?? 'Error al asociar la dependencia  al tipo de proceso'
        )
      },
    })
  const { mutateAsync: deleteOfficeProcess, isPending: loadingDeleteOffice } =
    useMutationDynamicBaseUrl({
      url: `/process-types/${idProcessType}/for-office/`,
      method: 'DELETE',
      baseKey: 'urlProcess',
      isCompanyRequest: true,
      onSuccess: () => {
        toast.success('Dependencia eliminada del tipo de proceso con éxito')
        refetchOffice()
        setNewRow(false)
      },
      onError: (e) => {
        setRowModesModel({ ...rowModesModel, [rowSelected]: { mode: GridRowModes.Edit } })
        toast.error(
          e?.response?.data?.error ?? 'Error al eliminar la dependencia  al tipo de proceso'
        )
      },
    })
  const { mutateAsync: updateOfficeProcess, isPending: loadingUpdateOffice } =
    useMutationDynamicBaseUrl({
      url: `/process-types/${idProcessType}/for-office/`,
      method: 'PUT',
      baseKey: 'urlProcess',
      isCompanyRequest: true,
      onSuccess: () => {
        toast.success('Dependencia editada del tipo de proceso con éxito')
        refetchOffice()
        setNewRow(false)
      },
      onError: (e) => {
        setRowModesModel({ ...rowModesModel, [rowSelected]: { mode: GridRowModes.Edit } })
        toast.error(
          e?.response?.data?.error ?? 'Error al editar la dependencia  al tipo de proceso'
        )
      },
    })
  return {
    getInfoOffice: { offices, loadingOffices, errorOffices },
    createOffice: { createOfficeProcess, loadingCreateOffice },
    getInfoHierarchy: { Hierarcy, loadingHierarcy },
    deleteOffice: { deleteOfficeProcess, loadingDeleteOffice },
    updateOffice: { updateOfficeProcess, loadingUpdateOffice },
  }
}
