import { useCreateEntity, useEditEntity } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const useUpdateRequest = ({ idEntity }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)
  const companyId = companyData?.companyId
  const { mutateAsync: createEntity, isPending: loadingCreate } = useCreateEntity({
    onSuccess: () => {
      queryClient.invalidateQueries([`/${companyId}/entes`])
      toast.success('Ente creado con éxito')
      navigate(`/applications/entities`)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  const { mutateAsync: editEntity, isPending: loadingEdit } = useEditEntity({
    idEntity,
    onSuccess: () => {
      queryClient.invalidateQueries([`/${companyId}/entes`])
      toast.success('Ente editado con éxito')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  return { createEntity, editEntity, loadingUpdate: loadingCreate || loadingEdit }
}

export const conditionalRequest = (data, editEntity, createEntity, idEntity) => {
  if (idEntity === 'new') {
    createEntity(data)
    return
  }
  editEntity(data)
}
