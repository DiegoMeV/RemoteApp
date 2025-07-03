import { useMutationDynamicBaseUrl } from '@/lib'
import toast from 'react-hot-toast'

export const useRequestCompromise = (idTable, idCompromise, refechCompromises) => {
  const { mutateAsync: createCompromise, isPending: isPendingCreate } = useMutationDynamicBaseUrl({
    url: `/compromisosAri/${idTable}`,
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    onSuccess: () => {
      toast.success('Creado correctamente')
      refechCompromises()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'ha ocurrido un error')
    },
  })
  const { mutateAsync: editCompromise, isPending: isPendingEdit } = useMutationDynamicBaseUrl({
    url: `/compromisosAri/${idCompromise}`,
    isCompanyRequest: true,
    method: 'put',
    baseKey: 'urlCgr',
    onSuccess: () => {
      toast.success('Editado correctamente')
      refechCompromises()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'ha ocurrido un error')
    },
  })
  return { createCompromise, editCompromise, loadingUpdate: isPendingEdit || isPendingCreate }
}
