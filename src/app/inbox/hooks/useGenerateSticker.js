import { processDocument, useGetBufferDocument, useMutationDynamicBaseUrl } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'
import { useState } from 'react'
import toast from 'react-hot-toast'

const useGenerateSticker = ({ id }) => {
  const [newBuffer, setNewBuffer] = useState(null)
  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)
  const companyId = companyData?.companyId
  const { mutateAsync: getBuffer, isLoading: loadingBuffer } = useGetBufferDocument({
    companyId,
    onSuccess: async (response) => {
      const buffer = await processDocument({ buffer: response })

      setNewBuffer(buffer)
    },
    onError: () => {
      toast.error('Error al obtener el sticker')
    },
  })
  const { mutateAsync: generateSticker, isPending: isPendingGenerateSticker } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlProcess',
      isCompanyRequest: true,
      url: `/processes/${id}/generate-sticker`,
      method: 'PUT',
      onSuccess: async (response) => {
        if (response.success) {
          queryClient.invalidateQueries([`/processes/${id}?inclPendingActs=true`])

          await getBuffer({ qry: `${response?.data?.processData?.idDocumentSticker}/documentos` })
        }
      },
      onError: () => {
        toast.error('Error al generar el sticker')
      },
    })

  return {
    generateSticker,
    isPendingGenerateSticker,
    loadingBuffer,
    newBuffer,
  }
}

export default useGenerateSticker
