import { useSubmitDocument } from '@/lib'
import toast from 'react-hot-toast'
import { useCancelAnyAction, useProcessModifyItem } from '../../hooks'
import { useStoreActions } from 'easy-peasy'
import { useMutationDynamicBaseUrl } from '@/libV4'

const useUpload = (
  ids,
  elementAction,
  idActivityAction,
  refetchElementActions,
  refecthDocumentsByActivity,
  setElementActionLocal,
  idAction
) => {
  const [idProcess, idActivity] = ids || []

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const idDocument = elementAction?.activityActionItemData?.documentData?.id

  const { mutateAsync: performAction, isPending: updatingItemAction } = useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    url: `/processes/${idProcess}/activities/${idActivity}/items-to-perform/${idAction}`,
    method: 'get',
    onSuccess: (response) => {
      setElementActionLocal(response?.data?.[0])
    },
    onError: () => {
      refetchElementActions()
    },
  })

  const onSuccessAditional = async (response) => {
    performAction({ qry: `?idTaskActionItem=${response?.data?.idTaskActionItem}` })
  }

  const onErrorAditional = () => {
    performAction({ qry: `?idTaskActionItem=${elementAction.id}` })
  }

  const { modifyItemInformation, loadingItemCreation } = useProcessModifyItem(
    idActivityAction,
    null,
    onSuccessAditional,
    null,
    onErrorAditional
  )

  const { mutateAsync: uploadDoc, isPending: isLoadingUpload } = useSubmitDocument({
    qry: '/uploadDoc',
    onSuccess: (response) => {
      const body = {
        idTaskActionItem: elementAction?.id,
        idDocument: response?.data?.[0]?.id,
        idDocumentVersion: response?.data?.[0]?.idVersion,
        documentStatus: response?.data?.[0]?.estado,
      }

      const qry = `/${elementAction?.activityActionItemData?.id ?? ''}`
      const methodBody = elementAction?.activityActionItemData?.id ? 'put' : 'post'
      modifyItemInformation({ qry: qry, body, methodBody })

      toast.success('Documento cargado correctamente')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  const onSuccessCancelDocument = async (response) => {
    const qry = `/${elementAction?.activityActionItemData?.id ?? ''}`
    const methodBody = elementAction?.activityActionItemData?.id ? 'put' : 'post'
    await modifyItemInformation({
      qry,
      methodBody,
      body: {
        idTaskActionItem: elementAction.id,
        idDocument: response.data.id,
        idDocumentVersion: response.data.especificaciones.version,
        documentStatus: response.data.estado,
      },
    })
    await refecthDocumentsByActivity()
  }

  const { cancelDocument, isPendingCancel } = useCancelAnyAction(
    idDocument,
    onSuccessCancelDocument
  )

  const handleFileUpload = async (event) => {
    const File = new FormData()
    File.append('file', event.target.files[0])
    File.append('idActivity', idActivity)
    File.append('idProceso', idProcess)
    File.append('nombreMostrar', elementAction?.name)

    await uploadDoc({ body: File })
    event.target.value = ''
  }

  const handleCancelDocument = async () => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: '',
      content: '¿Está seguro que desea anular el documento?',
      onConfirm: async () => {
        await cancelDocument({ estado: 'ANULADO' })
      },
    })
  }

  return {
    handleFileUpload,
    handleCancelDocument,
    isLoading: isLoadingUpload || isPendingCancel || loadingItemCreation || updatingItemAction,
  }
}

export default useUpload
