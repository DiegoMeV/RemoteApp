import { useMutationDynamicBaseUrl, useQueryDynamicApi, useUploadDocument } from '@/lib'
import toast from 'react-hot-toast'

export const useApisRequests = ({ idMassiveActivity }) => {
  const {
    data: files,
    isFetching: isLoading,
    isError,
    refetch: refetchFiles,
  } = useQueryDynamicApi({
    url: `/massive-activities/${idMassiveActivity}/attached-files`,
    isCompanyRequest: true,
    baseKey: 'urlFiscalizacion',
  })
  const { mutateAsync: uploadDoc, isPending: isLoadingUpload } = useUploadDocument({
    onSuccess: () => {
      toast.success('Documento cargado correctamente')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  const { mutateAsync: addToMassiveFile, isPending: loadingAdd } = useMutationDynamicBaseUrl({
    url: `/massive-activities/${idMassiveActivity}/attached-files`,
    baseKey: 'urlFiscalizacion',
    isCompanyRequest: true,
    onSuccess: () => {
      refetchFiles()
      toast.success('Documento asociado correctamente')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  const { mutateAsync: deleteFile, isPending: loadingDelete } = useMutationDynamicBaseUrl({
    url: `/massive-activities/${idMassiveActivity}/attached-files`,
    baseKey: 'urlFiscalizacion',
    isCompanyRequest: true,
    method: 'DELETE',
    onSuccess: () => {
      refetchFiles()
      toast.success('Documento eliminado correctamente')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  const loading = isLoadingUpload || loadingAdd || loadingDelete
  return { uploadDoc, addToMassiveFile, deleteFile, files, isLoading, isError, loading }
}
