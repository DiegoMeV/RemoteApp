import { useCreateDomain, useEditDomain } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const editFun = async (data, editDomain, createDomain, idEdition, type) => {
  const active = data.activo ? 'S' : 'N'

  if (idEdition === 'new') {
    await createDomain({ ...data, activo: active, tipo: type })
  } else {
    await editDomain({ ...data, activo: active })
  }
}

export const useRequestsDomain = (idEdition, subPage) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)
  const { mutateAsync: editDomain, isPending: loadingEdit } = useEditDomain({
    idDomain: idEdition,
    onSuccess: () => {
      toast.success('Editado correctamente')
      queryClient.invalidateQueries([`/${companyData?.companyId}/dominios`])
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  const { mutateAsync: createDomain, isPending: loadingCreate } = useCreateDomain({
    onSuccess: () => {
      toast.success('Editado correctamente')
      queryClient.invalidateQueries([`/${companyData?.companyId}/dominios`])
      navigate(`/applications/domains/${subPage}`)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  return { editDomain, createDomain, loadingRequest: loadingEdit || loadingCreate }
}
