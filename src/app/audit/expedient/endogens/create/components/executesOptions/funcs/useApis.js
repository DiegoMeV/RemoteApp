import { downloadBuffer, useGetBufferDocument, useMutationDynamicBaseUrl } from '@/lib'
import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'

export const useApis = ({ idInspectionPlan, getInspectionPlanQueue, getInspectionPlanJob }) => {
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)
  const { mutateAsync: downloadXLSXApi, isPending: isLoadingXlsx } = useGetBufferDocument({
    onSuccess: async (response) => {
      const contentType = response.headers.get('Content-Type')
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
  const { mutateAsync: genXLSXApi, isPending: isPendingXLSXGen } = useMutationDynamicBaseUrl({
    baseKey: 'urlFiscalizacion',
    url: `/inspectionPlan/${idInspectionPlan}/subject/generate/XLSX`,
    isCompanyRequest: true,
    method: 'GET',
    onSuccess: () => {
      getInspectionPlanQueue({ qry: `/EXCEL_SUBJECT_GEN/${idInspectionPlan}` })
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'Ha ocurrido un error')
    },
  })

  const { mutateAsync: createExecInspection, isPending: isLoadingCreateExecInspection } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlFiscalizacion',
      url: `/inspectionPlan/${idInspectionPlan}/exec-inspection-plan`,
      isCompanyRequest: true,
      method: 'POST',
      onSuccess: () => {
        getInspectionPlanJob()
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error || 'Error al crear el plan de inspección')
      },
    })
  const loadingXlsx = isLoadingXlsx || isPendingXLSXGen

  return {
    downloadXLSXApi,
    genXLSXApi,
    createExecInspection,
    isLoadingCreateExecInspection,
    loadingXlsx,
  }
}
