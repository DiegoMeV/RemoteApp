import { useMutationDynamicBaseUrl } from '@/lib'
import { GridRowModes } from '@mui/x-data-grid-premium'
import toast from 'react-hot-toast'

export * from './columnsForContractsTypes'

export const useRequestsVarContractType = (refetchVar, setRowModesModel, setNewRow, editedVar) => {
  const { mutateAsync: createVar, isPending: loadingCreate } = useMutationDynamicBaseUrl({
    url: '/variablesTipoContrato',
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    onSuccess: () => {
      toast.success('Variable creada con éxito')
      refetchVar()
      setNewRow(false)
      setRowModesModel({})
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
      setRowModesModel((prev) => {
        return { ...prev, [editedVar.id]: { mode: GridRowModes.Edit } }
      })
    },
  })
  const { mutateAsync: editVar, isPending: loadingEdit } = useMutationDynamicBaseUrl({
    url: '/variablesTipoContrato',
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    method: 'put',
    onSuccess: () => {
      toast.success('Variable editada con éxito')
      refetchVar()
      setRowModesModel((prev) => {
        return { ...prev, [editedVar.id]: { mode: GridRowModes.View, ignoreModifications: true } }
      })
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
      setRowModesModel((prev) => {
        return { ...prev, [editedVar.id]: { mode: GridRowModes.Edit } }
      })
    },
  })
  return { createVar, editVar, loadingUpdate: loadingCreate || loadingEdit }
}
