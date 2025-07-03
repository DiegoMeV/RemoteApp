import { downloadBuffer, useGetBufferTemplate, useMutationDynamicBaseUrl } from '@/lib'
import { useStoreState } from 'easy-peasy'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const useFunctionsTemplates = ({
  queryClient,
  versionInfo,
  setVersionInfo,
  isDownload,
  setIsDownload,
  setBufferDocument,
  modalUploadTemplate,
}) => {
  const form = useForm()
  const companyData = useStoreState((state) => state.company.companyData)
  const idCompany = companyData?.companyId ?? ''
  const idtemplate = versionInfo?.info?.idPlantilla ?? ''
  const idVersion = versionInfo?.info?.id ?? ''
  const { mutateAsync: createTemplate, isPending: loadingPostTemplate } = useMutationDynamicBaseUrl(
    {
      baseKey: 'urlDocuments',
      url: '/plantillas/uploadPlan',
      method: 'post',
      isCompanyRequest: true,
      onSuccess: async () => {
        form.unregister()
        setVersionInfo(null)
        modalUploadTemplate.handleShow()
        toast.success('Plantilla subida con éxito')
        await queryClient.invalidateQueries([`/${idCompany}/plantillas`])
      },
      onError: (error) => {
        toast.error('Error al subir la plantilla', error?.response?.data?.error)
      },
    }
  )

  const { mutateAsync: editVersionTemplate, isPending: loadingEditVersionTemplate } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlDocuments',
      url: `/plantillas/${idtemplate}/versiones/${idVersion}`,
      method: 'put',
      isCompanyRequest: true,
      onSuccess: async () => {
        form.unregister()
        setVersionInfo(null)
        modalUploadTemplate.handleShow()
        toast.success('Plantilla subida con éxito')
        await queryClient.invalidateQueries([`/${idCompany}/plantillas`])
      },
      onError: (error) => {
        toast.error('Error al subir la plantilla', error?.response?.data?.error)
      },
    })

  const { mutateAsync: downloadTemplate, isPending: loadingDownloadTemplate } =
    useGetBufferTemplate({
      onSuccess: (response) => {
        if (!isDownload) {
          setBufferDocument(response)
          return
        }
        downloadBuffer(response)
        setIsDownload(false)
      },
      onError: (error) => {
        toast.error('Error al subir la plantilla', error)
      },
    })

  return {
    createTemplate,
    editVersionTemplate,
    downloadTemplate,
    loadingPostTemplate,
    loadingEditVersionTemplate,
    loadingDownloadTemplate,
  }
}

export default useFunctionsTemplates
