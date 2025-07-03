import { useSubmitDocument } from '@/lib'
import toast from 'react-hot-toast'

export const useDocumentFunctions = (idDocument, updateInfo) => {
  const { mutateAsync: generateDocument, isPending: isPendingGen } = useSubmitDocument({
    qry: `/generate`,
    onSuccess: async (response) => {
      toast.success('Generación exitosa')
      updateInfo(response)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  const { mutateAsync: regenerateDocument, isPending: isPendingReg } = useSubmitDocument({
    qry: `/generate/${idDocument}`,
    onSuccess: (response) => {
      toast.success('Generación exitosa')
      updateInfo(response)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
    idDocument,
  })

  return { generateDocument, regenerateDocument, isPending: isPendingGen || isPendingReg }
}
