import { useCreateCriteriaCat, useEditCriteriaCat } from '@/lib'
import { GridRowModes } from '@mui/x-data-grid-premium'
import toast from 'react-hot-toast'

export const useRequestCriteriaCat = (
  refetchVar,
  setRowModesModel,
  setNewRow,
  editedVar,
  newRow
) => {
  const { mutateAsync: createCriteriaCat, isPending: loadingCreate } = useCreateCriteriaCat({
    onSuccess: () => {
      toast.success('Criterio creado con éxito')
      refetchVar()
      setNewRow(false)
      if (newRow) {
        setRowModesModel({})
      }
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
      setRowModesModel((prev) => {
        return { ...prev, [editedVar.id]: { mode: GridRowModes.Edit } }
      })
    },
  })
  const { mutateAsync: editCriteriaCat, isPending: loadingEdit } = useEditCriteriaCat({
    onSuccess: () => {
      toast.success('Criterio editada con éxito')
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
  return { createCriteriaCat, editCriteriaCat, loadingUpdate: loadingCreate || loadingEdit }
}
