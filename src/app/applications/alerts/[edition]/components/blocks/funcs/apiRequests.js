import { useCreateVarToAlert, useUpdateVarToAlert } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useApiRequest = () => {
  const queryClient = useQueryClient()
  const { mutateAsync: postVar, isPending: loadingPost } = useCreateVarToAlert({
    onSuccess: () => {
      toast.success('Variable creada')
      queryClient.invalidateQueries([`/datosAlerta`])
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'Error al crear la variable')
    },
  })
  const { mutateAsync: putVar, isPending: loadingPut } = useUpdateVarToAlert({
    onSuccess: () => {
      //TODO: agregar el nombre de la variable actualizada
      toast.success('Variable actualizada')
      queryClient.invalidateQueries([`/datosAlerta`])
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'Error al actualizar la variable')
    },
  })
  let loadingVars = loadingPost || loadingPut
  return { postVar, putVar, loadingVars }
}
