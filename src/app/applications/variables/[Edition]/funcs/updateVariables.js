import { useCreateVariables, useEditVariables } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const useUpdateRequest = ({ idVariable }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)
  const { mutateAsync: createVariable, isPending: loadingCreate } = useCreateVariables({
    onSuccess: () => {
      queryClient.invalidateQueries([`/${companyData?.companyId}/variables`])
      toast.success('Variable creada con éxito')
      navigate(`/applications/variables`)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  const { mutateAsync: editVariable, isPending: loadingEdit } = useEditVariables({
    idVariable,
    onSuccess: () => {
      queryClient.invalidateQueries([`/${companyData?.companyId}/variables`])
      toast.success('Variable editada con éxito')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  return { createVariable, editVariable, loadingUpdate: loadingCreate || loadingEdit }
}

export const conditionalRequest = async (data, editVariable, createVariable, idVariable) => {
  if (idVariable === 'new') {
    await createVariable(data)
  } else {
    await editVariable(data)
  }
}
