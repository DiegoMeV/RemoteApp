import { useMutationDynamicBaseUrl } from '@/lib'
import toast from 'react-hot-toast'

export const useSaveFormDataActivities = (idProcess, idActivity, action) => {
  const { mutateAsync: modifyItemInformation, isPending: loadingItemCreation } =
    useMutationDynamicBaseUrl({
      isCompanyRequest: true,
      baseKey: 'urlFiscalizacion',
      method: 'PUT',
      url: `/processes/${idProcess}/activities/${idActivity}/save-form-data/${action?.id}`,
      onSuccess: () => {
        toast.success('Elemento modificado correctamente')
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? 'Error al agregar elemento')
      },
    })

  return { modifyItemInformation, loadingItemCreation }
}
