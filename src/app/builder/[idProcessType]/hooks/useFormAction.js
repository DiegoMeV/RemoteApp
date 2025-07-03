// DEPRECATED in the NEXT PR
import { useStoreActions } from 'easy-peasy'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { convertToNumber, MagicString, toArray, useBoolean } from '@/lib'
import { actionItemSetter, deleteActionItemsCurrentState } from '../funcs'
import useRequestActionItems from './useRequestActionItems'

const useFormAction = ({ element, actionItemsInfo }) => {
  const { actionItems, setActionItems } = actionItemsInfo

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const optionsValue = (variableType, options) => {
    return variableType !== 'lov'
      ? { min: options?.min ?? '', max: options?.max ?? '' }
      : toArray(options)
  }

  const advanceSettingState = useBoolean()

  const [value, setValue] = useState({
    name: element?.name ?? '',
    description: element.description ?? '',
    isEnabled: element.isEnabled ?? true,
    isRequired: element.isRequired ?? false,
    position: element.position ?? '',
    variableType:
      element.variableType === 'textarea' ? 'longText' : element.variableType ?? 'shortText',
    options: element.options || optionsValue(element.variableType, element.actionItemSpecs.options),
    variableName: element.variableName ?? '',
  })

  const [optionsInputLocal, setOptionsInputLocal] = useState(
    element.options || optionsValue(element.variableType, element.options)
  )

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

  // TODO:
  // const conditionState = () => {
  //   //TODO: It doesn't work, verificate why this function doesn't work
  //   return (
  //     value.name !== element?.name ||
  //     value.description !== element?.description ||
  //     value.isRequired !== element?.isRequired ||
  //     value.isEnabled !== element?.isEnabled ||
  //     value.variableType !== element?.variableType ||
  //     value.variableName !== element?.variableName
  //   )
  // }

  const [funcsReq, valReq] = useRequestActionItems({
    setInfoToActionsItems: (response) => {
      actionItemSetter({ response, actionItems, setActionItems, value })
    },
    actionItems,
    setActionItems,
  })

  const { postElement, putElement, deleteElement } = funcsReq
  const { loading } = valReq

  const handleSaveElement = (currentAction, currentElement) => {
    //TODO:
    // if (!conditionState()) {
    //   toast.error('No hay cambios por agregar')
    //   return
    // }

    const currentValue = value
    const { options, variableType, ...restBody } = currentValue

    const optionSetters = {
      options: optionsValue(variableType, options),
    }

    const body = {
      idTaskAction: currentAction.id,
      id: currentElement.id,
      ...restBody,
      variableType: variableType === 'longText' ? 'textarea' : value.variableType,
      actionItemSpecs: optionSetters,
      position: convertToNumber(value?.position) || 1,
    }

    if (currentElement.isNew) {
      body.method = 'post'
      postElement(body)
      return
    }

    body.method = 'put'
    body.idItem = currentElement.id

    putElement(body)
    return
  }

  const handleChange = (ev) => {
    if (ev.target.name === 'variableType' && ev.target.value !== value.variableType) {
      const optionByType = optionsValue(ev.target.value, {})
      setOptionsInputLocal(optionByType)
    }

    if (ev.target.name === 'isRequired' || ev.target.name === 'isEnabled') {
      setValue({ ...value, [ev.target.name]: ev.target.checked })
    } else {
      setValue({ ...value, [ev.target.name]: ev.target.value })
    }
  }

  const handleModalSubmit = ({ data = {}, isArr = false }) => {
    advanceSettingState.handleShow()
    if (!isArr) {
      setValue((prev) => ({ ...prev, options: optionsInputLocal }))
      return
    }
    setValue((prev) => ({ ...prev, options: toArray(data.actionItemSpecs) }))
  }

  const stateVars = {
    value,
    loadingElement: loading,
    optionsInputLocal,
    advanceSettingState,
  }
  const stateFns = {
    handleChange,
    handleDeleteElement,
    handleSaveElement,
    setOptionsInputLocal,
    handleModalSubmit,
  }
  return [stateVars, stateFns]
}

export default useFormAction
