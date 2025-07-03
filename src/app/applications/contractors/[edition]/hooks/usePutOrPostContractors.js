import { usePostContractors, usePutContractors } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const usePutOrPostContractors = (idEdition, pathBack, handleClose) => {
  const navigate = useNavigate()
  const userData = useStoreState((state) => state.user.userData)
  const backPathUrl = useStoreState((state) => state.backPathUrl.backPathUrl)
  const idCompany = userData?.companies[0]?.companyId
  const queryClient = useQueryClient()
  const setModalShow = useStoreActions((actions) => actions.modalFuncs.setModalShow)

  const { mutate: putInfoContractor, isPending: loadingPut } = usePutContractors({
    idContractor: idEdition,
    onSuccess: async () => {
      toast.success('Contratista actualizado con éxito')
      await queryClient.invalidateQueries([`/${idCompany}/terceros`])
      if (pathBack) {
        navigate(pathBack)
      }
      if (handleClose) {
        handleClose()
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error ?? 'Error al actualizar el contratisa')
    },
  })

  const { mutate: postInfoContractor, isPending: loadingPost } = usePostContractors({
    onSuccess: () => {
      toast.success('Contratista creado con éxito')
      queryClient.invalidateQueries([`/${idCompany}/terceros`])
      setModalShow()
      if (!backPathUrl) {
        navigate(`/applications/contractors`)
        return
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error ?? 'Error al crear el contratisa')
    },
  })
  const loadingAction = loadingPut || loadingPost

  return { putInfoContractor, postInfoContractor, loadingAction }
}
