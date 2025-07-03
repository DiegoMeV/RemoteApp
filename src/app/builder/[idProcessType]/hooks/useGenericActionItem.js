import { convertToNumber, MagicString } from '@/lib'
import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'

import { actionItemSetter, deleteActionItemsCurrentState } from '../funcs'
import { useForm } from 'react-hook-form'
import useRequestActionItems from './useRequestActionItems'

const useGenericActionItem = ({
  element,
  action,
  actionItemsInfo,
  elementToSend = {},
  elementToSendNonItemSpecs = {},
  handleValueSetter = (value) => value,
} = {}) => {
  const { actionItems, setActionItems } = actionItemsInfo

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const { control, handleSubmit, watch, getValues, setValue } = useForm({
    defaultValues: {
      // TODO: This default values has been to just the 'element' object
      ...elementToSendNonItemSpecs,
      name: element?.name ?? '',
      isRequired: element?.isRequired ?? false,
      position: element?.position ?? 1,
      isEnabled: element?.isEnabled ?? false,
      actionItemSpecs: { ...elementToSend },
    },
  })

  const handleDeleteElement = (action, elementToDelete) => {
    if (actionItems?.length <= 1) {
      toast.error(MagicString.CONSTRUCTOR.ONE_ELEMENT_DELETE_MESSAGE)
      return
    }

    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: MagicString.CONSTRUCTOR.TITLE_DELETE_ELEMENT,
      content: MagicString.CONSTRUCTOR.SURE_MESSAGE_DELETE_ELEMENT,
      onConfirm: () => {
        deleteActionItemsCurrentState({
          action,
          actionItems,
          elementToDelete,
          setActionItems,
          methodToDelete: deleteElement,
        })
      },
    })
  }

  const setInfoToActionsItems = (response) => {
    const value = getValues()

    const valueToSend = handleValueSetter(value)

    actionItemSetter({
      response,
      actionItems,
      setActionItems,
      value: valueToSend,
    })
  }

  const handleSaveElement = (data) => {
    // TO-DO: Add validation to save data
    const body = {
      ...data,
      idTaskAction: action?.id ?? '',
      id: element?.id ?? '',
      position: convertToNumber(data?.position) || 1,
    }

    if (element.isNew) {
      body.method = 'post'
      postElement(body)
      return
    }

    body.method = 'put'
    body.idItem = element.id

    putElement(body)
    return
  }

  const [funcsReq, valReq] = useRequestActionItems({
    setInfoToActionsItems,
    actionItems,
    setActionItems,
  })

  const { postElement, putElement, deleteElement } = funcsReq
  const { loading } = valReq

  const stateVars = {
    loadingElement: loading,
    control,
  }
  const stateFns = {
    handleSaveElement,
    handleSubmit,
    handleDeleteElement,
    watch,
    setValue,
    getValues,
  }
  return [stateVars, stateFns]
}

export default useGenericActionItem
