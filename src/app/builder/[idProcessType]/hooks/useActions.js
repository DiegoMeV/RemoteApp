import { MagicString, useDeleteActions, useItemsAskForInfo, useUpdateActions } from '@/lib'
import { useStoreActions } from 'easy-peasy'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

const MINIMUN_SIZE_ELEMENT = 1

const useActions = (data, actionInfo) => {
  const { actions, setActions, refetchActions } = actionInfo

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const [value, setValue] = useState({
    name: data?.name ?? '',
    position: data?.position ?? 0,
    isRequired: data?.isRequired ?? true,
    isEnabled: data?.isEnabled ?? true,
    idGoToTask: data?.idGoToTask ?? null,
    nameGoToTask: data?.GoToTask?.name ?? '',
  })

  const [expandAccordion, setExpandAccordion] = useState(false)

  const {
    data: infoActionItems,
    isFetching: loadingItems,
    refetch: refetchActionItems,
  } = useItemsAskForInfo({
    idTaskAction: data.id,
    expandedEnabled: expandAccordion,
  })

  const [actionItems, setActionItems] = useState([])

  useEffect(() => {
    if (infoActionItems?.success) {
      setActionItems(infoActionItems?.data ?? [])
    }
  }, [infoActionItems])

  const handleDeleteSuccess = () => {
    const filteredActions = actions?.filter((action) => action.id !== data.id)
    setActions(filteredActions)

    toast.success(`Se eliminó la acción: ${data.name}`)

    refetchActions()
  }

  const handleDeleteError = (err) => {
    const errorMessage = err?.response?.data?.error || MagicString.CONSTRUCTOR.TASK_NOT_DELETED
    toast.error(errorMessage)
  }

  const { mutateAsync: deleteAction, isPending: loadingDeleteAction } = useDeleteActions({
    onSuccess: handleDeleteSuccess,
    onError: handleDeleteError,
  })

  // TODO: DOCUMENTAR Y PONER EN FUNCS
  const getCurrentAction = ({ action = {}, actionChanged = {} }) => {
    if (action?.id === actionChanged?.id) {
      return {
        ...action,
        name: actionChanged?.name,
        isRequired: actionChanged?.isRequired,
        isEnabled: actionChanged?.isEnabled,
        idGoToTask: actionChanged?.idGoToTask,
      }
    }
    return { ...action }
  }

  // TODO: CAMBIAR EL NOMBRE
  const addElementsToStore = ({ actionChanged }) => {
    const updatedActions = actions?.map((action) => getCurrentAction({ action, actionChanged }))

    setActions(updatedActions)
  }

  const handleUpdateSuccess = (response) => {
    const responseInfo = response?.data

    addElementsToStore({
      actionChanged: responseInfo,
    })

    toast.success(MagicString.CONSTRUCTOR.ACTION_UPDATED_SUCCESSFULLY)

    refetchActions()
  }

  const { mutateAsync: updateAction, isPending: loadingAction } = useUpdateActions({
    onSuccess: handleUpdateSuccess,
    onError: () => toast.error(MagicString.CONSTRUCTOR.ACTION_NOT_UPDATED),
  })

  const handleChange = (ev, name) => {
    setValue({ ...value, [name]: ev })
  }

  const handleSaveAction = () => {
    if (
      value.name === data.name &&
      value.isRequired === data.isRequired &&
      value.isEnabled === data.isEnabled &&
      value.idGoToTask === data.idGoToTask &&
      value.position === data.position
    ) {
      toast.error(MagicString.CONSTRUCTOR.NO_CHANGES)
      return
    }
    const body = {
      idTask: data.idTask,
      idAction: data.id,
      ...value,
    }

    delete body.nameGoToTask

    updateAction(body)
  }

  const handleAddElement = () => {
    let newElement = {
      isNew: true,
      id: uuidv4(),
      name: '',
      description: '',
      position: actionItems?.length + 1,
      isRequired: true,
      isEnabled: true,
      idGoToTask: null,
    }

    if (data.actionType === 'SAVE_FORM') {
      newElement = {
        ...newElement,
        type: 'shortText',
        options: {},
      }
    }

    const currentActionItems = actionItems ?? []

    const currentItems = [...currentActionItems, newElement]

    toast.success(MagicString.CONSTRUCTOR.ELEMENT_ADDED_PARTIALLY)

    setActionItems(currentItems)
  }

  const handleDeleteAction = () => {
    const messageAction =
      actionItems?.length <= MINIMUN_SIZE_ELEMENT
        ? `${actionItems?.length ?? 0} elemento`
        : `${actionItems?.length ?? 0} elementos`

    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: MagicString.CONSTRUCTOR.TITLE_DELETE_ACTION,
      content: `¿Está seguro de eliminar ${data.name}? Esta acción tiene ${messageAction}.`,
      onConfirm: () => {
        const body = {
          id: data.id,
          idTask: data.idTask,
        }
        deleteAction(body)
      },
    })
  }

  const stateVars = {
    value,
    expandAccordion,
    loading: loadingAction || loadingDeleteAction || loadingItems,
    actionItems,
  }
  const stateFns = {
    handleSaveAction,
    handleDeleteAction,
    handleAddElement,
    handleChange,
    setExpandAccordion,
    setValue,
    setActionItems,
    refetchActionItems,
  }
  return [stateVars, stateFns]
}

export default useActions
