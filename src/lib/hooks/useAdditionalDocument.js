import { MagicString, useCancelAction, useUploadAditional } from '@/lib'
import toast from 'react-hot-toast'
import { useStoreActions } from 'easy-peasy'

const useAdditionalDocument = ({
  idDocument,
  ids,
  refecthDocumentsByActivity,
  fileName,
  document,
  refetchSourceProcess,
}) => {
  const [idProcess, idActivityCreated] = ids || []
  const qry = document.isNew ? `` : `?idDocumento=${idDocument}`
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const { mutateAsync: uploadDoc, isPending: isLoadingUpload } = useUploadAditional({
    qry,
    onSuccess: async () => {
      toast.success('Documento cargado correctamente')
      await refecthDocumentsByActivity()
      if (refetchSourceProcess) {
        await refetchSourceProcess()
      }
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? MagicString.ERROR_MESSAGE)
    },
  })

  const { mutateAsync: cancelDocument, isPending: isPendingCancel } = useCancelAction({
    onSuccess: async () => {
      toast.success('Documento anulado correctamente')
      await refecthDocumentsByActivity()
      if (refetchSourceProcess) {
        await refetchSourceProcess()
      }
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? MagicString.ERROR_MESSAGE)
    },
    idDocument: idDocument,
  })
  const handleFileUpload = async (event) => {
    const File = new FormData()
    File.append('file', event.target.files[0])
    File.append('idProceso', idProcess)
    File.append('idActivity', idActivityCreated)
    File.append('nombreMostrar', fileName)
    await uploadDoc(File)
    await refecthDocumentsByActivity()
    if (refetchSourceProcess) {
      await refetchSourceProcess()
    }
  }

  const handleCancelDocument = async () => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: '',
      content: '¿Está seguro que desea anular el documento?',
      onConfirm: async () => {
        await cancelDocument({ estado: 'ANULADO' })
        await refecthDocumentsByActivity()
        if (refetchSourceProcess) {
          await refetchSourceProcess()
        }
      },
    })
  }

  return {
    handleFileUpload,
    handleCancelDocument,
    isLoading: isLoadingUpload || isPendingCancel,
  }
}

export default useAdditionalDocument
