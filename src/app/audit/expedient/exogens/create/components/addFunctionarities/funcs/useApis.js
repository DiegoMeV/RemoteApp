import { useMutationDynamicBaseUrl } from '@/lib'
import { GridRowModes } from '@mui/x-data-grid-premium'
import toast from 'react-hot-toast'

export const useApis = ({
  idInspectionPlan,
  setRows,
  setNewRow,
  setRowModesModel,
  idProcessRow,
  rowModesModel,
  apiRef,
}) => {
  const { mutateAsync: getInspectionOfficials, isPending: isLoadingInfoOfficials } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlFiscalizacion',
      url: `/inspectionPlan/${idInspectionPlan}/officers`,
      isCompanyRequest: true,
      method: 'GET',
      onSuccess: (e) => {
        setRows(
          e.data.map((row) => ({
            id: row.id,
            third: `${row.dataUser?.firstName ?? ''} ${row.dataUser?.lastName ?? ''}`,
            order: row.order,
            percentage: row.percentage,
          }))
        )
      },
      onError: (e) => {
        toast.error(
          e?.response?.data?.error || 'Error al traer los actores asociados a el plan de inspección'
        )
      },
    })

  const { mutateAsync: createInspectionOfficials, isPending: isLoadingCreateOfficials } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlFiscalizacion',
      url: `/inspectionPlan/${idInspectionPlan}/officers`,
      isCompanyRequest: true,
      method: 'POST',
      onSuccess: () => {
        setNewRow(false)
        getInspectionOfficials()
      },
      onError: (e) => {
        setRowModesModel({ ...rowModesModel, [idProcessRow]: { mode: GridRowModes.Edit } })
        apiRef.current.startRowEditMode({ id: idProcessRow })
        toast.error(e?.response?.data?.error || 'Error al crear el plan de inspección')
      },
    })
  const { mutateAsync: deleteInspectionOfficials, isPending: isLoadingDeleteOfficials } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlFiscalizacion',
      url: `/inspectionPlan/${idInspectionPlan}/officers`,
      isCompanyRequest: true,
      method: 'DELETE',
      onSuccess: () => {
        getInspectionOfficials()
        toast.success('Se ha eliminado el funcionario correctamente')
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error || 'Error al eliminar el plan de inspección')
      },
    })
  return {
    getInspectionOfficials,
    createInspectionOfficials,
    deleteInspectionOfficials,
    isLoadingInfoOfficials,
    isLoadingCreateOfficials,
    isLoadingDeleteOfficials,
  }
}
