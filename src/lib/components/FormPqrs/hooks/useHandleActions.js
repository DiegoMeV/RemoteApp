import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'

const useHandleActions = ({
  createProcess = () => {},
  editProcess = () => {},
  setActiveStep = () => {},
  updateActivity = () => {},
  activeStep,
  navigate,
  idProcess,
  validationComplainant,
}) => {
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const conditionalsObSubmit = {
    0: (data) => {
      const body = {
        idOfficeOrigin: data?.office?.id,
        idProcessType: data?.typeProcess?.id,
      }
      if (idProcess) {
        editProcess({ body: { processData: body?.processData ?? {} } })
        return
      }

      createProcess({ body })
    },
    1: (data) => {
      const { processData } = data
      const adaptAdditonalData = Object.keys(processData?.additionalData).reduce((acc, item) => {
        acc[item] = processData?.additionalData?.[item]?.id ?? processData?.additionalData?.[item]
        return acc
      }, {})

      const body = {
        idOfficeOrigin: data?.office?.id,
        idProcessType: data?.typeProcess?.id,
        processData: {
          additionalData: { ...adaptAdditonalData },
        },
      }
      if (idProcess) {
        editProcess({ body: { processData: body?.processData ?? {} } })
        setActiveStep(2)
        return
      }
    },
    2: async () => {
      // PETICIONARIOS
      // SE ENVIAN POR EL ENDPOINT DE ACTORES
      if (validationComplainant) {
        setActiveStep(3)
        return
      }
      toast.error('Debe agregar al menos un peticionario')
      return
    },
    3: () => {
      setConfirmAlertProps({
        open: true,
        icon: 'warning',
        title: 'Finalizar ',
        content: '¿Está seguro que desea terminar la radicación?',
        onConfirm: () => {
          updateActivity({
            body: {
              status: 'COMPLETED',
            },
          })
        },
      })
    },
  }

  const handleBack = () => {
    if (activeStep === 0) {
      setConfirmAlertProps({
        open: true,
        icon: 'warning',
        title: 'Activar',
        content: '¿Está seguro de volver a la bandeja?',
        onConfirm: () => {
          navigate('/inbox')
        },
      })
      return
    }
    setActiveStep((prev) => prev - 1)
  }

  const onSubmit = (data) => {
    conditionalsObSubmit?.[activeStep](data)
  }

  return { handleBack, onSubmit }
}

export default useHandleActions
