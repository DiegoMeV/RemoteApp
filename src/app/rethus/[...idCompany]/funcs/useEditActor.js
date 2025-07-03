import { useMutationDynamicBaseUrl } from '@/lib'
import toast from 'react-hot-toast'

export const useEditActor = ({
  idProcess,
  idCompany,
  getProcessActor,
  idActor,
  activeStep,
  setActiveStep,
  isEditing,
  modalForm,
  originUrl,
  navigate,
}) => {
  const { mutateAsync: editActor, isPending: loadingEditionActor } = useMutationDynamicBaseUrl({
    baseKey: 'urlProcess',
    url: `/processes/${idProcess}/actors/${idActor}`,
    isCompanyRequest: true,
    method: 'put',
    companyId: idCompany,
    onSuccess: () => {
      toast.success('Se ha actualizado el actor correctamente')
      if (activeStep === 3 && isEditing) {
        if (modalForm?.show) {
          modalForm.handleShow()
          return
        }
        navigate(`${originUrl}/inbox`)
      }
      getProcessActor({
        qry: `/${idProcess}/actors?inclActorType=true&actorTypeKey=PETICIONARIO`,
      })
      setActiveStep(activeStep + 1)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al actualizar el actor')
    },
  })
  return { editActor, loadingEditionActor }
}
