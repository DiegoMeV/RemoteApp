import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'

const useOnSubmit = ({
  activeStep,
  idProcess,
  createProcess,
  editProcess,
  setActiveStep,
  finallyProcess,
  idProcessParent,
}) => {
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const onSubmit = (data) => {
    let { typeProcess, office, ...additionalData } = data
    additionalData = Object.fromEntries(
      Object.entries(data).filter(([key]) => key !== 'registryNumber' && key !== 'RegistryDate')
    )
    if (activeStep === 0) {
      if (!idProcess) {
        const dataActivity = {
          idProcessType: typeProcess?.id,
          idOfficeOrigin: office?.id,
          idParentProcess: idProcessParent ? idProcessParent : null,
          processData: {
            additionalData: {
              ...additionalData,
            },
          },
        }
        setConfirmAlertProps({
          open: true,
          icon: 'info',
          title: 'Confirmar registro',
          content:
            'A partir de este momento se creará un consecutivo para el registro de envíos documentales, ¿desea continuar?',
          onConfirm: () => {
            createProcess({ body: dataActivity })
          },
        })
        return
      }
      editProcess({ body: { processData: { additionalData: additionalData } } })
    }
    if (activeStep === 1) {
      if (!data.REMITENTE?.length) {
        toast.error('Debe agregar al menos un remitente.')
        return
      }
      if (!idProcess) {
        toast.error('Debe registrar el proceso antes de agregar remitentes.')
        return
      }
      setActiveStep(activeStep + 1)
    }
    if (activeStep === 2) {
      if (!Object.keys(data.DESTINATARIO || {}).length) {
        toast.error('Debe agregar al menos un destinatario.')
        return
      }
      finallyProcess()
    }
  }
  return onSubmit
}

export default useOnSubmit
