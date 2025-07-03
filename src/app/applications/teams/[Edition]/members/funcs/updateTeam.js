import { useEditTeam } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'

export const editFuncTeams = async (data, editActingType) => {
  await editActingType(data)
}

export const useRequestsTeam = (idEdition) => {
  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)
  const { mutateAsync: editActingType, isPending: loadingEdit } = useEditTeam({
    idTeam: idEdition,
    onSuccess: () => {
      toast.success('Editado correctamente')
      queryClient.invalidateQueries([`/${companyData?.companyId}/teams`])
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  return { editActingType, loadingUpdate: loadingEdit }
}
