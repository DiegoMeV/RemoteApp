import { useMutation } from '@tanstack/react-query'
import { baseUrls } from '@/lib'
import { requestQr } from '@/app/qrDocView/funcs'

const useQrDocumentInfo = ({ onSuccess, onError, di, idCompany, tk }) => {

  const base = baseUrls.urlDocuments
  const qry = `/${idCompany}/documentos/${di}/QRDocumentInfo`

  return useMutation({
    mutationFn: async () => {
      try {
        if(!tk) {
          return
        }
        const response = await requestQr(base, qry, tk)
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess,
    onError,
  })
}

export default useQrDocumentInfo
