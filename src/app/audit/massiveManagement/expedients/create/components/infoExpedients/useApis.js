import { downloadBuffer, useGetBufferDocument, useMutationDynamicBaseUrl } from '@/lib'
import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'

export const useApis = ({ idMassiveActivity, getMassiveActivitiesQueue }) => {
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)

  const { mutateAsync: downloadZipApi, isPending: isPendingZip } = useGetBufferDocument({
    onSuccess: async (response) => {
      const contentType = response.headers.get('Content-Type')
      getMassiveActivitiesQueue({ qry: `/MASSIVE_GEN_ZIP/${idMassiveActivity}` })
      if (contentType?.includes('pdf')) {
        await setPreviewer({
          open: true,
          bufferD: response,
          isRegenerable: false,
        })
        return
      } else {
        downloadBuffer(response)
      }
    },
    onError: (e) => {
      toast.error(e?.data?.error ?? 'Error al obtener el documento')
    },
  })

  const { mutateAsync: genZipApi, isPending: isPendingZipGen } = useMutationDynamicBaseUrl({
    baseKey: 'urlFiscalizacion',
    url: `/massive-activities/${idMassiveActivity}/expedients/gen-zip`,
    isCompanyRequest: true,
    method: 'GET',
    onSuccess: () => {
      getMassiveActivitiesQueue({ qry: `/MASSIVE_GEN_ZIP/${idMassiveActivity}` })
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'Ha ocurrido un error')
    },
  })

  return { downloadZipApi, genZipApi, isPendingZip, isPendingZipGen }
}
