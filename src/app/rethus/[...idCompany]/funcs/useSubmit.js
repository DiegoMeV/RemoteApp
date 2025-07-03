import { deepEqual, removeUndefinedAndNullValues } from '@/lib'

const useSubmit = ({
  activeStep,
  setActiveStep,
  infoProcessSelected,
  infoActors,
  createActor,
  editActor,
  updateProcess,
  userProcess,
  isEditing,
  modalForm,
  originUrl,
  navigate,
}) => {
  const onSubmit = (data) => {
    // Filter data to send to the backend and create the actor
    const infoProcessActual = Object.entries(infoActors ?? {}).reduce((acc, [key, value]) => {
      if (value !== undefined && key !== 'emailConfirm' && key !== 'documentos') {
        acc[key] = typeof value === 'object' && value !== null && value.id ? value.id : value
      }
      return acc
    }, {})
    const optimizedRestOfInfo = Object.entries(data).reduce((acc, [key, value]) => {
      if (
        value !== undefined &&
        ![
          'emailConfirm',
          'documentos',
          'type_process',
          'nroResolucion',
          'fechaResolucion',
        ].includes(key)
      ) {
        //use id in case have one in the value
        acc[key] = typeof value === 'object' && value !== null && value.id ? value.id : value
      }
      return acc
    }, {})

    // Body to create the actor
    const bodyActor = {
      actorTypeKey: 'PETICIONARIO',
      actorData: {
        additionalData: optimizedRestOfInfo,
      },
    }
    // First step
    if (activeStep === 0) {
      // set active step to next step
      setActiveStep(activeStep + 1)
    }
    // Second step
    if (activeStep === 1 || activeStep === 2 || activeStep === 3) {
      if (
        deepEqual(
          removeUndefinedAndNullValues(infoProcessActual?.actorData?.additionalData),
          removeUndefinedAndNullValues(bodyActor?.actorData?.additionalData)
        )
      ) {
        if (isEditing && activeStep === 3) {
          if (modalForm?.show) {
            modalForm.handleShow()
            return
          }
          navigate(`${originUrl}/inbox`)
        }
        setActiveStep(activeStep + 1)
        return
      }
      // If there is no process created
      if (!infoProcessSelected) {
        userProcess({
          qry: `/${optimizedRestOfInfo?.documentNumber}/processes?career=${optimizedRestOfInfo?.career}`,
        })
      }
      // If there is a process created and there is no actor created
      if (infoProcessSelected && !infoActors) {
        createActor({ body: bodyActor })
      }
      // If there is a process created and there is an actor created
      if (infoProcessSelected && infoActors) {
        editActor({ body: bodyActor })
      }
    }

    if (activeStep === 4) {
      if (typeof data.documentos === 'object') {
        updateProcess({ body: { processData: { completed: true } } })
        return
      }
    }
  }
  return onSubmit
}

export default useSubmit
