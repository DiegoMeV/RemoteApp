import { useMutationDynamicBaseUrl } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const useRequestTeam = (idEdition) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)
  const { mutateAsync: createTeam, isPending: loadingCreate } = useMutationDynamicBaseUrl({
    url: '/equiposUri',
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    onSuccess: () => {
      toast.success('Creado correctamente')
      queryClient.invalidateQueries([`/${companyData?.companyId}/teams`])
      navigate(`/applications/teams`)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'ha ocurrido un error')
    },
  })
  const { mutateAsync: editTeam, isPending: isPendingAsing } = useMutationDynamicBaseUrl({
    url: `/equiposUri/${idEdition}`,
    isCompanyRequest: true,
    method: 'put',
    baseKey: 'urlCgr',
    onSuccess: () => {
      toast.success('Editado correctamente')
      queryClient.invalidateQueries([`/${companyData?.companyId}/teams`])
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'ha ocurrido un error')
    },
  })
  return { createTeam, editTeam, loadingUpdate: isPendingAsing || loadingCreate }
}

export default useRequestTeam
