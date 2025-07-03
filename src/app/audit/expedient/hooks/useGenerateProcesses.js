import { useMutationDynamicBaseUrl } from '@/lib'
import toast from 'react-hot-toast'

const useGenerateProcesses = ({ idInspectionPlan, getInspectionPlanQueue }) => {
  const {
    mutateAsync: generateProcesses,
    isPending: isPendingGenerateProcesses,
    isError,
    isSuccess,
  } = useMutationDynamicBaseUrl({
    baseKey: 'urlFiscalizacion',
    url: `/inspectionPlan/${idInspectionPlan}/generate-processes`,
    isCompanyRequest: true,
    method: 'POST',
    onSuccess: () => {
      getInspectionPlanQueue({ qry: `/INSPECTION_CREATE_PROCESS/${idInspectionPlan}` })
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'Error al generar el expediente')
    },
  })

  return { generateProcesses, isPendingGenerateProcesses, isSuccess, isError }
}

export default useGenerateProcesses
