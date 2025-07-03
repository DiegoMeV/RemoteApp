import { useMutationDynamicBaseUrl } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useProcessFunctions = (
  idProcess,
  idActivity,
  refetchManagement,
  handleCloseModal,
  onSuccessUpdateProcess,
  setDisabledButton
) => {
  const {
    mutateAsync: updateProcess,
    isPending: isPendingUpdateProcess,
    isSuccess: successUpdateProcess,
    isError: errorUpdateProcess,
  } = useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlFiscalizacion',
    url: `/processes/${idProcess}/activities/${idActivity}/actions`,
    onSuccess: async (response) => {
      toast.success('Acción creada con éxito')
      await onSuccessUpdateProcess?.(response)
      refetchManagement?.()
      handleCloseModal?.()
      setDisabledButton?.(true)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  return { updateProcess, isPendingUpdateProcess, successUpdateProcess, errorUpdateProcess }
}

export const useCancelAnyAction = (idDocument, onSuccessCancelDocument) => {
  const { mutateAsync: cancelDocument, isPending: isPendingCancel } = useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlDocuments',
    url: `/documentos/${idDocument}`,
    method: 'put',
    onSuccess: (response) => {
      onSuccessCancelDocument?.(response)
      toast.success('Documento anulado correctamente')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  return { cancelDocument, isPendingCancel }
}

export const useProcessModifyItem = (
  idActivityAction,
  refetchElementActions,
  onSuccessAditional,
  setDisabledButton,
  ...props
) => {
  const queryClient = useQueryClient()

  const qry = idActivityAction ? `${idActivityAction}/items` : ''
  const { mutateAsync: modifyItemInformation, isPending: loadingItemCreation } =
    useMutationDynamicBaseUrl({
      isCompanyRequest: true,
      baseKey: 'urlFiscalizacion',
      url: `/processes/activity-actions/${qry}`,
      onSuccess: (response) => {
        toast.success('Elemento modificado correctamente')
        if (!idActivityAction) {
          queryClient.invalidateQueries([`/processes`])
        }
        refetchElementActions?.()
        onSuccessAditional?.(response)
        setDisabledButton?.(true)
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? 'Error al modificar el elemento')
      },
      ...props,
    })

  return { modifyItemInformation, loadingItemCreation }
}
