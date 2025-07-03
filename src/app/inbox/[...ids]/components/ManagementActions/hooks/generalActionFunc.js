import { useCancelAction, useMutationDynamicBaseUrl, useUpdateProcess } from '@/lib'
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
  } = useUpdateProcess({
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
    idProcess,
    idActivity,
  })
  return { updateProcess, isPendingUpdateProcess, successUpdateProcess, errorUpdateProcess }
}

export const useCancelAnyAction = (idDocument, onSuccessCancelDocument) => {
  const { mutateAsync: cancelDocument, isPending: isPendingCancel } = useCancelAction({
    onSuccess: (response) => {
      onSuccessCancelDocument?.(response)
      toast.success('Documento anulado correctamente')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
    idDocument: idDocument,
  })
  return { cancelDocument, isPendingCancel }
}

export const useProcessModifyItem = (
  idActivityAction,
  refetchElementActions,
  onSuccessAditional,
  setDisabledButton,
  onErrorAditional,
  ...props
) => {
  const queryClient = useQueryClient()

  const qry = idActivityAction ? `${idActivityAction}/items` : ''
  const { mutateAsync: modifyItemInformation, isPending: loadingItemCreation } =
    useMutationDynamicBaseUrl({
      isCompanyRequest: true,
      baseKey: 'urlProcess',
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
        onErrorAditional?.()
        toast.error(e?.response?.data?.error ?? 'Error al modificar el elemento')
      },
      ...props,
    })

  return { modifyItemInformation, loadingItemCreation }
}
