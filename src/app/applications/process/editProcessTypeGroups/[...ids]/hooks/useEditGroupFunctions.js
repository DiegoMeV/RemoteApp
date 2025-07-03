import { useCreateProcessTypeGroup, useEditProcessTypeGroup } from '@/lib'
import toast from 'react-hot-toast'

const useEditGroupFunctions = (idGroup) => {
  const { mutateAsync: editGroup, isPending: loadingEditGroup } = useEditProcessTypeGroup({
    idGroup: idGroup,
    onSuccess: () => {
      toast.success('Grupo editado correctamente')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  const { mutateAsync: createGroup, isPending: loadingCreateGroup } = useCreateProcessTypeGroup({
    onSuccess: () => {
      toast.success('Grupo creado correctamente')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  return { editGroup, createGroup, isLoading: loadingEditGroup || loadingCreateGroup }
}

export default useEditGroupFunctions
