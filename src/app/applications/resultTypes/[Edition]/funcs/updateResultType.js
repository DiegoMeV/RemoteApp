import { useMutationDynamicBaseUrl } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const editFuncResultTypes = async (data, editResultType, createResultType, idEdition) => {
  if (idEdition === 'new') {
    await createResultType({ body: data })
  } else {
    await editResultType({ body: data })
  }
}

export const useRequestResultType = (idEdition) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)
  const { mutateAsync: createResultType, isPending: loadingCreate } = useMutationDynamicBaseUrl({
    url: '/tipoResultado',
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    onSuccess: () => {
      toast.success('Creado correctamente')
      queryClient.invalidateQueries([`/${companyData?.companyId}/resultTypes`])
      navigate(`/applications/resultTypes`)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'ha ocurrido un error')
    },
  })
  const { mutateAsync: editResultType, isPending: isPendingAsing } = useMutationDynamicBaseUrl({
    url: `/tipoResultado/${idEdition}`,
    isCompanyRequest: true,
    method: 'put',
    baseKey: 'urlCgr',
    onSuccess: () => {
      toast.success('Editado correctamente')
      queryClient.invalidateQueries([`/${companyData?.companyId}/resultTypes`])
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'ha ocurrido un error')
    },
  })
  return { createResultType, editResultType, loadingUpdate: isPendingAsing || loadingCreate }
}
