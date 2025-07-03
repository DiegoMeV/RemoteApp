import { useCallback, useEffect, useMemo, useState } from 'react'
import { conditionStateSpecs, handleCloseMenu, totalActionTypes } from './funcs'
import toast from 'react-hot-toast'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useCreateActions, useBoolean, useUpdateActivities, MagicString } from '@/lib'

const useAcordionsTaks = ({ task, refetchActivities, setActions, actions }) => {
  const stageSelected = useStoreState((actions) => actions.reactFlowState.stageSelected)
  const variationParams = useStoreState((state) => state.reactFlowState.variationParams)

  const isProcessService = variationParams?.byActionTypes === 'process'

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const ActivityParamsStates = useBoolean()

  const taskSpecs = {
    duration: {
      type: task?.taskSpecs?.duration?.type ?? null,
      value: task?.taskSpecs?.duration?.value ?? '',
    },
    alerts: {
      warning: task?.taskSpecs?.alerts?.warning ?? 0,
      critical: task?.taskSpecs?.alerts?.critical ?? 0,
    },
    setProcessStatus: task?.setProcessStatus ?? null,
    ...(isProcessService ? { actorTypeToNotifyName: task?.ActorTypeToNotify?.name ?? '' } : {}),
    ...(isProcessService ? { idActorTypeToNotify: task?.idActorTypeToNotify ?? null } : {}),
    ...(isProcessService ? { idNextTask: task?.idNextTask ?? null } : {}),
    ...(isProcessService ? { nameNextTask: task?.nextTaskData?.name ?? '' } : {}),
    ...(isProcessService ? { notificateOnReject: task?.notificateOnReject ?? null } : {}),
    ...(isProcessService ? { notificateOnNewTask: task?.notificateOnNewTask ?? null } : {}),
    ...(isProcessService ? { showSuggested: task?.showSuggested ?? false } : {}),
    ...(isProcessService ? { allowParallel: task?.allowParallel ?? false } : {}),
    ...(isProcessService ? { stopNotification: task?.stopNotification ?? false } : {}),
  }

  const [stateDataTask, setStateDataTask] = useState({
    name: '',
    description: task?.description ?? '',
    idRole: task?.idRole ?? null,
    isEnabled: task?.isEnabled ?? false,
    position: task?.position ?? 0,
    roleName: task?.roleData?.name ?? '',
    Actions: task?.Actions ?? [],
  })

  useEffect(() => {
    setStateDataTask({
      ...stateDataTask,
      name: task?.name ?? '',
      description: task?.description ?? '',
      idRole: task?.idRole ?? null,
      isEnabled: task?.isEnabled ?? false,
      position: task?.position ?? 0,
      // PENDIENTE DE REVISAR
      // roleName: task?.roleData?.name ?? '',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task])

  const [formValues, setFormValues] = useState(taskSpecs)
  const [currentFormSpecsValues, setCurrentFormSpecsValues] = useState(taskSpecs)

  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState({
    addAction: null,
  })

  const openMenu = {
    addAction: Boolean(anchorEl.addAction),
  }

  const handleToggle = () => setOpen((prevState) => !prevState)

  const { mutateAsync: createActions, isPending: loadingCreate } = useCreateActions({
    onSuccess: (response) => {
      setActions((prevState) => {
        return [response.data, ...prevState]
      })
    },
    onError: (err) =>
      toast.error(err?.response?.data?.error ?? MagicString.CONSTRUCTOR.ACTION_CREATED_ERROR),
  })

  const { mutateAsync: updateActivity, isPending: loadingUpdateActivities } = useUpdateActivities({
    onSuccess: () => {
      refetchActivities()
      toast.success(MagicString.CONSTRUCTOR.STAGE_UPDATED)
    },
    onError: (err) =>
      toast.error(err?.response?.data?.error ?? MagicString.CONSTRUCTOR.TASK_UPDATED_ERROR),
  })

  const taskObjectToSave = () => {
    const copyFormValues = { ...formValues }
    const {
      duration,
      idNextTask,
      setProcessStatus,
      notificateOnReject,
      notificateOnNewTask,
      showSuggested,
      stopNotification,
      allowParallel,
      idActorTypeToNotify,
      ...taskSpecs
    } = copyFormValues

    const {
      actorTypeToNotifyName, // eslint-disable-line no-unused-vars
      nameNextTask, // eslint-disable-line no-unused-vars,
      ...restTaskSpecs
    } = taskSpecs

    const durationValue = duration?.type
      ? { type: duration.type, value: Number(duration.value) || 0 }
      : {}

    const objToSave = {
      ...(isProcessService ? { idNextTask } : {}),
      ...(isProcessService ? { idActorTypeToNotify } : {}),
      ...(isProcessService ? { idNextTask } : {}),
      ...(isProcessService ? { notificateOnReject } : {}),
      ...(isProcessService ? { notificateOnNewTask } : {}),
      ...(isProcessService ? { showSuggested } : {}),
      ...(isProcessService ? { allowParallel } : {}),
      ...(isProcessService ? { stopNotification } : {}),
      setProcessStatus,
      taskSpecs: { ...restTaskSpecs, duration: durationValue },
    }

    return objToSave
  }

  const localObjectToCompare = (taskInfo) => {
    return {
      ...formValues,
      ...taskInfo.taskSpecs,
    }
  }

  const handleSaveTask = (taskSave, stateDataTask) => {
    const body = {
      id: taskSave.id,
      ...stateDataTask,
    }

    updateActivity(body)
  }

  const handleSaveModalInfo = (ev) => {
    ev.preventDefault()

    if (!conditionStateSpecs(currentFormSpecsValues, formValues)) {
      toast.error(MagicString.CONSTRUCTOR.ERROR_MESSAGE_NO_CHANGES)
      return
    }

    ActivityParamsStates.handleShow()

    const updateTaskInfo = taskObjectToSave()
    handleSaveTask(task, updateTaskInfo)

    const localObject = localObjectToCompare(updateTaskInfo)

    setFormValues(localObject)
    setCurrentFormSpecsValues(localObject)
  }

  const handleChange = (value, variable) => {
    setStateDataTask({ ...stateDataTask, [variable]: value })
  }

  const handleAddAction = useCallback(
    (idTask, actionType, label) => {
      const body = {
        idActivity: idTask,
        name: label,
        shortName: label,
        actionType: actionType,
        isRequired: true,
        isEnabled: true,
        position: actions?.length + 1,
      }

      createActions(body)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stageSelected, task, actions]
  )

  const handleSetRole = (row) => {
    if (!row) {
      setStateDataTask({ ...stateDataTask, idRole: null, roleName: '' })
      return
    }

    setStateDataTask({ ...stateDataTask, idRole: row?.id, roleName: row.name })
    toast.success('Rol seleccionado')
  }

  const matchActionType = useCallback(
    (matchingAction, typesMatch, type) => {
      if (matchingAction) {
        typesMatch.push({
          label: type.name,
          icon: type.icon,
          actionType: matchingAction.actionType,
          disabled: true,
          handleClick: '',
        })
      } else {
        typesMatch.push({
          label: type.name,
          icon: type.icon,
          actionType: type.actionType,
          disabled: false,
          handleClick: (event) => {
            handleAddAction(task.id, type.actionType, type.label)
            handleCloseMenu(event, 'addAction', setAnchorEl, anchorEl)
          },
        })
      }
    },
    [task, handleAddAction, anchorEl]
  )

  const typesMenu = useMemo(() => {
    const typesMatch = []
    totalActionTypes[variationParams?.byActionTypes ?? 'process']?.forEach((type) => {
      const matchingAction = actions?.find((action) => action.actionType === type.actionType)
      matchActionType(matchingAction, typesMatch, type)
    })
    return typesMatch
  }, [matchActionType, actions])

  const handleCancelModal = () => {
    if (!conditionStateSpecs(currentFormSpecsValues, formValues)) {
      ActivityParamsStates.handleShow()
      setFormValues(taskSpecs)
      return
    }
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: MagicString.CONSTRUCTOR.CONFIRMATION_TITLE,
      content: MagicString.CONSTRUCTOR.CONFIRMATION_MESSAGE,
      onConfirm: () => {
        ActivityParamsStates.handleShow()
        setFormValues(taskSpecs)
        toast.error(MagicString.CONSTRUCTOR.CHANGES_NO_SAVED)
      },
    })
  }

  const actionsActivityParams = [
    {
      label: 'Cancelar',
      color: 'error',
      variant: 'contained',
      onClick: handleCancelModal,
    },
    {
      label: 'Guardar',
      variant: 'contained',
      type: 'submit',
    },
  ]

  const stateVariables = {
    stateDataTask,
    anchorEl,
    openMenu,
    typesMenu,
    loadingCreate: loadingUpdateActivities || loadingCreate,
    formValues,
    ActivityParamsStates,
    actionsActivityParams,
    handleSetRole,
    open,
  }
  const stateFuntions = {
    handleChange,
    setAnchorEl,
    setFormValues,
    handleToggle,
    handleSaveModalInfo,
    handleSaveTask,
  }
  return [stateVariables, stateFuntions]
}

export default useAcordionsTaks
