import { useCreateTeamMember, useEditTeamMember } from '@/lib'
import { GridRowModes } from '@mui/x-data-grid-premium'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'

const useAssignUsersFunctions = (
  idMember,
  refetchJobtitles,
  editedRow,
  setRowModesModel,
  setAddNew,
  setRows
) => {
  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)
  const { mutateAsync: createTeamMember, isPending: loadingCreate } = useCreateTeamMember({
    onSuccess: () => {
      toast.success('Miembro creado correctamente')
      queryClient.invalidateQueries([`/${companyData?.companyId}/teams`])
      refetchJobtitles()
      setRowModesModel((prev) => {
        return {
          ...prev,
          [editedRow?.id]: { mode: GridRowModes.View, ignoreModifications: true },
        }
      })
      setRows((prev) => prev.filter((row) => row.id !== editedRow?.id))
      setAddNew()
    },
    onError: (e) => {
      setRowModesModel((prev) => {
        return {
          ...prev,
          [editedRow?.id]: { mode: GridRowModes.Edit },
        }
      })
      toast.error(e?.response?.data?.error)
    },
  })

  const { mutateAsync: editTeamMember, isPending: loadingEdit } = useEditTeamMember({
    idMember: idMember,
    onSuccess: () => {
      toast.success('Miembro editado correctamente')
      setRowModesModel((prev) => {
        return {
          ...prev,
          [editedRow?.id]: { mode: GridRowModes.View, ignoreModifications: true },
        }
      })
      queryClient.invalidateQueries([`/${companyData?.companyId}/teams`])
    },
    onError: (e) => {
      setRowModesModel((prev) => {
        return {
          ...prev,
          [editedRow?.id]: { mode: GridRowModes.Edit },
        }
      })
      toast.error(e?.response?.data?.error)
    },
  })
  return {
    createTeamMember,
    editTeamMember,
    isLoading: loadingCreate || loadingEdit,
  }
}

export default useAssignUsersFunctions
