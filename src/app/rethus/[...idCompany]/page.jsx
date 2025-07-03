import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { idGroupRethus, useAllProcessTypeByGroup, usePrivileges } from '@/lib'
import { ViewRethus } from './view'
import {
  useCreateActor,
  useCreateProcess,
  useEditActor,
  useProcessActor,
  useProcessInfo,
  useUpdateActivity,
  useUpdateProcess,
  useUserProcess,
} from './funcs'
import useSubmit from './funcs/useSubmit'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const Rethus = () => {
  const { idCompany, idProcess, modalForm } = useParams()
  const originUrl = window.location.origin
  const navigate = useNavigate()
  const hasPrivEdit = usePrivileges('rethus.gestion.editar_formulario')
  const { pathname } = useLocation()
  const [activeStep, setActiveStep] = useState(0)
  const [infoProcessSelected, setInfoProcessSelected] = useState()
  const [infoActors, setInfoActors] = useState()
  const { setValue, control, handleSubmit, getValues, watch, unregister } = useForm({
    mode: 'all',
    reValidateMode: 'onBlur',
  })
  useEffect(() => {
    if (infoActors) {
      if (
        Object.keys(infoActors?.actorData?.additionalData).length >= 16 &&
        Object.keys(infoActors?.actorData?.additionalData).length <= 18
      ) {
        setActiveStep(2)
      }
    }
  }, [infoActors])

  const { getProcessInfo, loadingProcessInfo, infoProcess } = useProcessInfo(
    idCompany,
    setInfoProcessSelected,
    setValue
  )

  const { getProcessActor, loadingProcessActor } = useProcessActor({
    idCompany,
    setInfoActors,
    setValue,
  })
  const { editActor, loadingEditionActor } = useEditActor({
    idProcess,
    idCompany,
    getProcessActor,
    idActor: infoActors?.id,
    activeStep,
    setActiveStep,
    isEditing: !!infoProcess?.data?.[0]?.processData?.completed,
    modalForm,
    originUrl,
    navigate,
  })
  const { updateActivity, loadingActivityUpdate } = useUpdateActivity({
    idCompany,
    idProcess,
    idActivity: infoProcessSelected?.pendingActivities?.[0].id,
    setActiveStep,
  })
  const { updateProcess, isUpdatingProcess } = useUpdateProcess({
    idCompany,
    idProcess,
    updateActivity,
  })

  useEffect(() => {
    if (idProcess) {
      getProcessInfo({
        qry: `/${idProcess}/?inclPendingActs=true&inclOfficeData=true`,
      })
      getProcessActor({
        qry: `/${idProcess}/actors?inclActorType=true&actorTypeKey=PETICIONARIO`,
      })
    }
  }, [getProcessInfo, idProcess, getProcessActor])
  const { createActor, loadingCreationActor } = useCreateActor({ idCompany, setActiveStep })
  const { createProcess, loadingCreation } = useCreateProcess({
    idCompany,
    path: pathname,
    getValues,
    createActor,
    infoActors,
  })
  const { userProcess, loadingUserProcess } = useUserProcess({
    idCompany,
    getValues,
    createProcess,
  })

  const onSubmit = useSubmit({
    activeStep,
    setActiveStep,
    infoProcessSelected,
    createActor,
    infoActors,
    editActor,
    updateProcess,
    isEditing: !!infoProcess?.data?.[0]?.processData?.completed,
    modalForm,
    userProcess,
    originUrl,
    navigate,
  })
  const {
    data: infoGroupProcess,
    isLoading: loadingGroupProcess,
    error: errorGroupProcess,
  } = useAllProcessTypeByGroup({
    enabled: !!idGroupRethus,
    idGroup: idGroupRethus,
    idCompany: idCompany,
    qry: `includeReqFiles=true`,
  })

  const props = {
    activeStep,
    setActiveStep,
    setValue,
    control,
    handleSubmit,
    onSubmit,
    infoGroupProcess,
    isLoading:
      loadingGroupProcess ||
      loadingProcessInfo ||
      loadingCreation ||
      loadingCreationActor ||
      loadingEditionActor ||
      loadingActivityUpdate ||
      isUpdatingProcess ||
      loadingProcessActor ||
      loadingUserProcess,
    error: errorGroupProcess,
    getValues,
    watch,
    infoProcessSelected,
    idCompany,
    unregister,
    isEditing: !!infoProcess?.data?.[0]?.processData?.completed,
    hasPrivilege: hasPrivEdit,
  }

  return <ViewRethus {...props} />
}
export default Rethus
