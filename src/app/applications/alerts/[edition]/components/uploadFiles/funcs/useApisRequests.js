import { useCreateFileToAlert, useGetFileByAlert, useUpdateFiles, useUploadDocument } from '@/lib'
import toast from 'react-hot-toast'

export const useApisRequests = ({ infoAlert, setRows, uploadFileAccState }) => {
  const {
    data: files,
    isFetching: isLoading,
    isError,
    refetch: refetchFiles,
  } = useGetFileByAlert({ idAlerta: infoAlert?.id, enabled: uploadFileAccState })
  const { mutateAsync: uploadDoc, isPending: isLoadingUpload } = useUploadDocument({
    onSuccess: () => {
      toast.success('Documento cargado correctamente')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  const { mutateAsync: addToAlertFile, isPending: loadingAdd } = useCreateFileToAlert({
    onSuccess: () => {
      refetchFiles()
      toast.success('Documento asociado a la alerta correctamente')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  const { mutateAsync: deleteFile, isPending: loadingDelete } = useUpdateFiles({
    onSuccess: (data, variables) => {
      setRows((prevRows) => prevRows.filter((row, i) => i !== variables?.index))
      toast.success('Documento eliminado de la alerta correctamente')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  const loading = isLoadingUpload || loadingAdd || loadingDelete
  return { uploadDoc, addToAlertFile, deleteFile, files, isLoading, isError, loading }
}
