import { toSnakeCase, useMutationDynamicBaseUrl } from '@/lib'
import toast from 'react-hot-toast'

export const useCancelDocs = ({
  idCompany,
  idDocument,
  fileRequired,
  idTaskAction,
  refetchInfoDocs,
  setInfoDocument,
  setValue,
}) => {
  const { mutateAsync: cancelDocument, isPending: loadingCancelDocument } =
    useMutationDynamicBaseUrl({
      isCompanyRequest: true,
      baseKey: 'urlDocuments',
      companyId: idCompany,
      method: 'put',
      url: `/documentos/${idDocument}`,
      onSuccess: () => {
        toast.success('Documento anulado correctamente')

        setInfoDocument()

        const document = {
          id: fileRequired?.id,
          name: '',
          required: false,
        }
        setValue('idTaskAction', idTaskAction)
        setValue(`documentos.${toSnakeCase(fileRequired?.name)}`, document)
        refetchInfoDocs()
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error)
      },
    })

  return { cancelDocument, loadingCancelDocument }
}
