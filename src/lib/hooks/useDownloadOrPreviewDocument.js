import { useStoreActions } from 'easy-peasy'
import { downloadBuffer } from '../utils'
import toast from 'react-hot-toast'
import { useGetBufferDocument } from '../api'

const useDownloadOrPreviewDocument = (queryParams) => {
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)
  const { mutateAsync: getBuffer, isPending: loadingDownload } = useGetBufferDocument({
    onSuccess: async (response) => {
      const contentType = response.headers.get('Content-Type')
      if (contentType?.includes('pdf')) {
        await setPreviewer({
          open: true,
          buffer: response,
          idDocument: queryParams?.idDocument,
          isNotRegenerable: queryParams?.isNotRegenerable,
        })
        return
      } else {
        downloadBuffer(response)
      }
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al obtener el documento')
    },
  })
  const handleDownloadDocument = ({ idDocument, idVersion }) => {
    getBuffer({ idDocument, idVersion })
  }
  return { handleDownloadDocument, loadingDownload }
}

export default useDownloadOrPreviewDocument
