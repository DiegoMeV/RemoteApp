import { baseUrls, useCreateProcessTypeGroup, useEditProcessTypeGroup } from '@/lib'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const useEditGroupFunctions = (idGroup, setValue, refetch) => {
  const navigate = useNavigate()
  const urlFiscalizacion = baseUrls.urlFiscalizacion
  const { mutateAsync: editGroup, isPending: loadingEditGroup } = useEditProcessTypeGroup({
    baseUrl: urlFiscalizacion,
    idGroup: idGroup,
    onSuccess: ({ data }) => {
      toast.success('Grupo editado correctamente')
      setValue('name', data?.name)
      setValue('isEnabled', data?.isEnabled)
      setValue('filingForm', data?.filingForm)
      setValue(
        'groupSpecs.historyConfig.showAssignedMode',
        data?.groupSpecs?.historyConfig?.showAssignedMode
      )
      refetch()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  const { mutateAsync: createGroup, isPending: loadingCreateGroup } = useCreateProcessTypeGroup({
    baseUrl: urlFiscalizacion,
    onSuccess: (response) => {
      navigate(`/audit/fiscalGroupProcess/edit/${response?.data?.id}`)
      toast.success('Grupo creado correctamente')
      refetch()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  return { editGroup, createGroup, isLoading: loadingEditGroup || loadingCreateGroup }
}

export default useEditGroupFunctions
