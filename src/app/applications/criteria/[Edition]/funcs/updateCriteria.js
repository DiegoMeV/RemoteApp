import { useCreateCriteria, useEditCriteria } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const editFun = async (data, editCriteria, createCriteria, idEdition) => {
  const active = data.activo ? 'S' : 'N'

  if (idEdition === 'new') {
    await createCriteria({ ...data, activo: active })
  } else {
    await editCriteria({ ...data, activo: active })
  }
}

export const useRequestsCriteria = (idEdition) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)
  const { mutateAsync: createCriteria, isPending: loadingCreate } = useCreateCriteria({
    onSuccess: () => {
      toast.success('Creado correctamente')
      queryClient.invalidateQueries([`/${companyData?.companyId}/criteria`])
      navigate(`/applications/criteria`)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  const { mutateAsync: editCriteria, isPending: loadingEdit } = useEditCriteria({
    idCriteria: idEdition,
    onSuccess: () => {
      toast.success('Editado correctamente')
      queryClient.invalidateQueries([`/${companyData?.companyId}/criteria`])
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  return { createCriteria, editCriteria, loadingUpdate: loadingEdit || loadingCreate }
}
