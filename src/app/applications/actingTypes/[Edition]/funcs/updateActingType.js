import { useMutationDynamicBaseUrl } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const editFuncActingTypes = async (data, editActingType, createActingType, idEdition) => {
  const active = data.activo ? 'S' : 'N'

  if (idEdition === 'new') {
    await createActingType({ ...data, activo: active })
  } else {
    await editActingType({ ...data, activo: active })
  }
}

export const useRequestsActingType = (idEdition) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)

  const { mutateAsync: createActingType, isPending: loadingCreate } = useMutationDynamicBaseUrl({
    url: '/tiposActuacion',
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    onSuccess: () => {
      toast.success('Creado correctamente')
      queryClient.invalidateQueries([`/${companyData?.companyId}/tiposActuacion`])
      navigate(`/applications/tiposActuacion`)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'ha ocurrido un error')
    },
  })

  const { mutateAsync: editActingType, isPending: loadingEdit } = useMutationDynamicBaseUrl({
    url: `/tiposActuacion/${idEdition}`,
    isCompanyRequest: true,
    method: 'put',
    baseKey: 'urlCgr',
    onSuccess: () => {
      toast.success('Editado correctamente')
      queryClient.invalidateQueries([`/${companyData?.companyId}/tiposActuacion`])
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'ha ocurrido un error')
    },
  })
  return { createActingType, editActingType, loadingUpdate: loadingEdit || loadingCreate }
}
