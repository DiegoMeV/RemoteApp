import { useMutationDynamicBaseUrl } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const useFunctionsUsers = (idUser) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const companyData = useStoreState((state) => state.company.companyData)
  const { mutateAsync: updateUser, isPending: isPendingUpdate } = useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlUsers',
    url: `/admin/users/${idUser}`,
    method: 'put',
    onSuccess: () => {
      queryClient.invalidateQueries([`/${companyData?.companyId}/users/${idUser}`])
      toast.success('Información de usuario actualizada')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  const { mutateAsync: createUser, isPending: isPendingCreate } = useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlUsers',
    url: '/users',
    onSuccess: (response) => {
      queryClient.invalidateQueries([`/${companyData?.companyId}/users`])
      toast.success('Usuario creado')
      navigate(`/administration/users/${response?.data?.id}`)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  return { updateUser, createUser, isPending: isPendingUpdate || isPendingCreate }
}
