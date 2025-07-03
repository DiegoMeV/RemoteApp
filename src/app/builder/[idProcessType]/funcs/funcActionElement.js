import { MagicString, toArray } from '@/lib'
import { siifwebTypeVoucher, updateElement } from '../hooks'
import toast from 'react-hot-toast'

/**
 * Filters out the element to delete from the 'askFor' array.
 * @param {Array} askFor - The array of elements to filter.
 * @param {Object} elementToDelete - The element to delete.
 * @returns {Array} - The filtered 'askFor' array.
 */
export const filterElementToDelete = (askFor, elementToDelete) =>
  askFor?.filter((element) => element?.id !== elementToDelete?.id)

/**
 * Separates new elements from existing ones in the 'askFor' array.
 * @param {Array} askFor - The array of elements to separate.
 * @returns {Object} - An object containing existing and new elements.
 */
const separateNewElements = (askFor) => {
  const askForToSeparated = toArray(askFor) ?? []
  const askForWithOutNews = askForToSeparated?.filter((element) => !element?.isNew)

  return { askForWithOutNews }
}

/**
 * Creates the body object and calls the 'deleteElement' function.
 * @param {Object} action - The action object.
 * @param {Object} elementToDelete - The object of element to delete.
 * @param {Function} deleteElement - This make the request to delete-update action-askFor items
 */
export const createBodyAndDeleteElement = (action, deleteElement, elementToDelete) => {
  const body = {
    idTaskAction: action?.id,
    idItem: elementToDelete.id,
    method: 'delete',
  }

  deleteElement(body)
}

/**
 * Creates the body object and calls the 'deleteElementToStore' function.
 * @param {Object} action - The action object.
 * @param {Object} elementToDelete - The object of element to delete.
 * @param {Object} infoFlow - The container of stages, task and connections in easy-peasy
 * @param {Function} setTasksNActions - This is a action that set new values for tasks and actions
 * @param {Object} idTask - The id of the current task
 */
const createBodyAndDeleteElementToStore = (
  action,
  elementToDelete,
  infoFlow,
  setTasksNActions,
  idTask
) => {
  const body = {
    idTaskAction: action?.id,
    id: elementToDelete.id,
  }

  deleteElementToStore(body, idTask, infoFlow, setTasksNActions)
}

/**
 * Confirm the deletion of an element, if it is a new element it is deleted locally
 * and if it is not it is "UPDATE" in the function to delete it.
 * @param {Array} actionItems - The array of elements to confirm deletion from.
 * @param {Object} action - The action object.
 * @param {Object} elementToDelete - The element to delete.
 * @param {number} idTask - The current id of the Task
 * @param {Function} deleteElement - This make the request to delete-update action-askFor items
 * @param {Object} infoFlow - The container of stages, task and connections in easy-peasy
 * @param {Function} setTasksNActions - This is a action that set new values for tasks and actions
 */
export const confirmDeleteElement = (
  actionItems,
  action,
  elementToDelete,
  deleteElement,
  infoFlow,
  setTasksNActions,
  idTask
) => {
  const newAskFor = filterElementToDelete(actionItems, elementToDelete)

  if (!elementToDelete?.isNew) {
    const { askForWithOutNews } = separateNewElements(newAskFor)

    const currentSizeToSendAskFor = askForWithOutNews?.length === 0
    if (currentSizeToSendAskFor) {
      toast.error(MagicString.CONSTRUCTOR.CANNOT_DELETE_ELEMENT)
      return
    }

    createBodyAndDeleteElement(action, deleteElement, elementToDelete)
    return
  }

  createBodyAndDeleteElementToStore(action, elementToDelete, infoFlow, setTasksNActions, idTask)
}

/**
 * Delete an element from the task's action items in the infoFlow and update the store.
 * @param {Object} element - The element to be deleted.
 * @param {string} taskElementId - The ID of the task containing the element.
 * @param {Object} infoFlow - The container of stages, tasks, and connections.
 * @param {Function} setTasksNActions - Function to set new values for tasks and actions.
 */
export const deleteElementToStore = (element, taskElementId, infoFlow, setTasksNActions) => {
  //THIS FUNCTION IS DEPRECATED
  const updatedInfoFlow = toArray(updateTasks(infoFlow?.tasks, taskElementId, element))
  setTasksNActions({ tasks: [...updatedInfoFlow] })
  toast.success(MagicString.CONSTRUCTOR.ELEMENT_HAS_BEEN_DELETED)
}

/**
 * Update the tasks by removing the specified element from the relevant action items.
 * @param {Array} tasks - The array of tasks.
 * @param {string} taskElementId - The ID of the task containing the element.
 * @param {Object} element - The element to be deleted.
 * @returns {Array} - The updated array of tasks.
 */
const updateTasks = (tasks, taskElementId, element) => {
  return tasks?.map((task) => {
    if (task?.id !== taskElementId) {
      return { ...task }
    }
    const updatedActions = updateActions(task?.Actions, element)
    return { ...task, Actions: updatedActions }
  })
}

/**
 * Update the actions by removing the specified element from the relevant action items.
 * @param {Array} actions - The array of actions.
 * @param {Object} element - The element to be deleted.
 * @returns {Array} - The updated array of actions.
 */
const updateActions = (actions, element) => {
  return actions.map((action) => {
    if (action.id !== element.idTaskAction) {
      return { ...action }
    }
    const updatedActionItems = updateActionItems(action?.ActionItems, element)
    return { ...action, ActionItems: updatedActionItems }
  })
}

/**
 * Update the action items by removing the specified element.
 * @param {Array} actionItems - The array of action items.
 * @param {Object} element - The element to be deleted.
 * @returns {Array} - The updated array of action items.
 */
export const updateActionItems = (actionItems, element) =>
  actionItems?.filter((item) => item.id !== element.id)

export const onErrorDeleteActionItemReq = (err) => {
  const messageError = err?.response?.data?.error
  if (messageError) {
    toast.error(messageError)
    return
  }
  toast.error(MagicString.CONSTRUCTOR.ELEMENT_HAS_NOT_BEEN_DELETED)
}

export const onErrorUpdateActionItemReq = (err) => {
  const messageError = err?.response?.data?.error
  if (messageError) {
    toast.error(messageError)
    return
  }
  toast.error(MagicString.CONSTRUCTOR.FAILED_UPDATE_ELEMENT)
}

export const onErrorCreateActionItemReq = (err) => {
  const messageError = err?.response?.data?.error
  if (messageError) {
    toast.error(messageError)
    return
  }
  toast.error(MagicString.CONSTRUCTOR.FAILED_CREATE_ELEMENT)
}

/**
 * This function can be improved by passing the complement of each actionItem
 * Set the actionItems with their real values
 * @param {Object} response - The response of the request
 * @param {Array} actionItems - The array of action items.
 * @param {Function} setActionItems - The function to set the action items.
 * @param {Object} value - The value of the actionItem that provides of useForm.
 */
export const actionItemSetter = ({ response, actionItems, setActionItems, value } = {}) => {
  const updatedActionItems = actionItems?.map((item) => {
    if (item?.id !== response?.data?.id) return item

    const currentItem = updateElement(response?.data, item, value)

    return { ...currentItem }
  })

  setActionItems(updatedActionItems)
}

// DOCUMENTAR
export const deleteActionItemsCurrentState = ({
  action,
  actionItems,
  elementToDelete,
  setActionItems,
  methodToDelete,
}) => {
  const arrWithOutElement = filterElementToDelete(actionItems, elementToDelete)

  if (!elementToDelete?.isNew) {
    const { askForWithOutNews } = separateNewElements(arrWithOutElement)

    const currentSizeToSendAskFor = askForWithOutNews?.length === 0

    if (currentSizeToSendAskFor) {
      toast.error(MagicString.CONSTRUCTOR.CANNOT_DELETE_ELEMENT)
      return
    }

    createBodyAndDeleteElement(action, methodToDelete, elementToDelete)
    return
  }

  const newActionItems = updateActionItems(actionItems, elementToDelete)
  setActionItems(newActionItems ?? [])
}

export const findVoucherTypeObject = (data) => {
  const voucherType = data?.actionItemSpecs?.siifwebData?.voucherType

  return siifwebTypeVoucher?.find((item) => item?.value === voucherType) ?? null
}

/**
 * Get the strategies to show the default values for the element in each actionType.
 * @param {String} actionType - The current actionType, can be REVIEW_NOTIFICATION, CREATE_NOTIFICATION or SEND_NOTIFICATION.
 * @param {Object} element - The current element that contains the values of the actionItem.
 * @returns {Object} - The strategies to show the default values for the element in each actionType.
 */
export const getElementNotificationPayload = ({ actionType, element = {} } = {}) => {
  const actionItemSpecs = {
    channel: element?.actionItemSpecs?.channel ?? '',
    defaultTo: element?.actionItemSpecs?.defaultTo ?? '',
    subject: element?.actionItemSpecs?.subject ?? '',
    defaultEmailSender: element?.actionItemSpecs?.defaultEmailSender ?? '',
  }

  const strategies = {
    REVIEW_NOTIFICATION: {
      elementToSend: {},
      elementToSendNonItemSpecs: { idActionItemRel: element?.idActionItemRel ?? null },
    },
    CREATE_NOTIFICATION: {
      elementToSend: { ...actionItemSpecs },
      elementToSendNonItemSpecs: {},
    },
    SEND_NOTIFICATION: {
      elementToSend: { ...actionItemSpecs },
      elementToSendNonItemSpecs: { idActionItemRel: element?.idActionItemRel ?? null },
    },
  }

  return strategies[actionType] || strategies['SEND_NOTIFICATION']
}
