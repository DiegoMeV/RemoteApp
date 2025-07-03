import { baseUrls, useCreateProcessType, useEditProcessType } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'

import toast from 'react-hot-toast'

const useActionsProcessType = ({ idProcessType, idGroup }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)
  const urlFiscalizacion = baseUrls.urlFiscalizacion

  const { mutateAsync: createProcessType, isPending: loadingCreatePT } = useCreateProcessType({
    baseUrl: urlFiscalizacion,
    onSuccess: async (response) => {
      queryClient.invalidateQueries([
        `/${companyData?.companyId}/process-types/?idGroup=${idGroup}`,
      ])
      toast.success('Tipo de proceso creado correctamente')
      navigate(`/audit/fiscalGroupProcess/editTypeProcess/${idGroup}/${response?.data?.id}`)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  const { mutateAsync: editProcessType, isPending: loadingEditPT } = useEditProcessType({
    baseUrl: urlFiscalizacion,
    idProcessType,
    onSuccess: async () => {
      toast.success('Tipo de proceso editado correctamente')
      await queryClient.invalidateQueries([
        `/${companyData?.companyId}/process-types/${idProcessType}`,
      ])
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  return { createProcessType, editProcessType, loadingPT: loadingCreatePT || loadingEditPT }
}

export default useActionsProcessType
