import { useMutationDynamicBaseUrl } from '@/lib'
import toast from 'react-hot-toast'

export const useApisActors = ({
  idProcess,
  handlerModal,
  formModal,
  setActorsInfo,
  form,
  typeActor,
  setNewRow,
}) => {
  const {
    mutateAsync: getProcessActor,
    data: actorsInfo,
    isPending: loadingActors,
  } = useMutationDynamicBaseUrl({
    url: `/processes/${idProcess}/actors?inclActorType=true`,
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    method: 'get',
    onSuccess: (e) => {
      form.setValue(`${typeActor}`, e?.data)
      setActorsInfo(e?.data)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al obtener los actores del proceso')
    },
  })
  const { mutateAsync: createActor, isPending: loadingCreationActor } = useMutationDynamicBaseUrl({
    baseKey: 'urlProcess',
    url: `/processes`,
    isCompanyRequest: true,
    onSuccess: () => {
      formModal?.reset()
      getProcessActor({
        qry: `&actorTypeKey=${typeActor}`,
      })
      handlerModal?.handleShow()
      setNewRow?.(false)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al crear el actor')
    },
  })
  const { mutateAsync: editActor, isPending: loadingEditionActor } = useMutationDynamicBaseUrl({
    baseKey: 'urlProcess',
    url: `/processes/${idProcess}/actors`,
    isCompanyRequest: true,
    method: 'put',
    onSuccess: () => {
      formModal?.reset()
      getProcessActor({
        qry: `&actorTypeKey=${typeActor}`,
      })
      handlerModal?.handleShow()
      setNewRow?.(false)
      toast.success('Actor actualizado correctamente')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al actualizar el actor')
    },
  })
  const { mutateAsync: deleteActor, isPending: loadingDelActor } = useMutationDynamicBaseUrl({
    baseKey: 'urlProcess',
    url: `/processes/${idProcess}/actors`,
    isCompanyRequest: true,
    method: 'DELETE',
    onSuccess: () => {
      getProcessActor({
        qry: `&actorTypeKey=${typeActor}`,
      })
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al eliminar el actor')
    },
  })
  const loadingHandlerActor = loadingCreationActor || loadingEditionActor || loadingDelActor

  return {
    getProcessActor,
    createActor,
    editActor,
    deleteActor,
    actorsInfo,
    loadingActors,
    loadingHandlerActor,
  }
}
