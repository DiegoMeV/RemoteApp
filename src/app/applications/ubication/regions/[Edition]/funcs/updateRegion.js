import { useCreateRegion, useEditRegion } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const useUpdateRequest = ({ idRegion }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)
  const { mutateAsync: createRegion, isPending: loadingCreate } = useCreateRegion({
    onSuccess: () => {
      queryClient.invalidateQueries([`/${companyData?.companyId}/regiones`])
      toast.success('Region creada con éxito')
      navigate(`/applications/regions`)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  const { mutateAsync: editRegion, isPending: loadingEdit } = useEditRegion({
    idRegion,
    onSuccess: () => {
      queryClient.invalidateQueries([`/${companyData?.companyId}/regiones`])
      toast.success('Region editada con éxito')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  return { createRegion, editRegion, loadingUpdate: loadingCreate || loadingEdit }
}

export const conditionalRequest = async (data, editRegion, createRegion, idRegion) => {
  if (idRegion === 'new') {
    await createRegion(data)
  } else {
    await editRegion(data)
  }
}
