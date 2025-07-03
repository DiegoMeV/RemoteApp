import { useMutationDynamicBaseUrl } from '@/lib/api'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useRequestsFamilyServices = ({ idProcess, typeTable, modalOptionsFS }) => {
  const queryClient = useQueryClient()

  const { mutateAsync: createActor, isPending: loadingCreation } = useMutationDynamicBaseUrl({
    baseKey: 'urlProcess',
    url: `/processes/${idProcess}/actors`,
    isCompanyRequest: true,
    onSuccess: () => {
      toast.success('Se ha creado el actor correctamente')
      queryClient.invalidateQueries([
        `/processes/${idProcess}/actors?inclActorType=true&actorTypeKey=${typeTable}`,
      ])
      modalOptionsFS.handleShow()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al crear el actor')
    },
  })

  const { mutateAsync: editActor, isPending: loadingEdition } = useMutationDynamicBaseUrl({
    baseKey: 'urlProcess',
    url: `/processes/${idProcess}/actors`,
    isCompanyRequest: true,
    onSuccess: () => {
      toast.success('Se ha editado el actor correctamente')
      queryClient.invalidateQueries([
        `/processes/${idProcess}/actors?inclActorType=true&actorTypeKey=${typeTable}`,
      ])
      modalOptionsFS.handleShow()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al crear el actor')
    },
  })
  return { editActor, createActor, loadingRequests: loadingCreation || loadingEdition }
}

export default useRequestsFamilyServices
