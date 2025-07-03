import { useCreateVariableModel, useEditVariableModel } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useApiCreateUpdateVariables = ({ setChecked, checked }) => {
  const queryClient = useQueryClient()
  const { mutateAsync: postActiveVariable, isPending: loadingPost } = useCreateVariableModel({
    onSuccess: () => {
      toast.success('Se ha activado la variable correctamente')
      queryClient.invalidateQueries('/variablesModelo')
      setChecked(!checked)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'Error al activar la variable')
    },
  })
  const { mutateAsync: putActiveVariable, isPending: loadingPut } = useEditVariableModel({
    onSuccess: () => {
      toast.success('Se ha actualizado la variable correctamente')
      queryClient.invalidateQueries('/variablesModelo')
      setChecked(!checked)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'Error al actualizar la variable')
    },
  })
  const loading = loadingPost || loadingPut
  return { postActiveVariable, putActiveVariable, loading }
}
