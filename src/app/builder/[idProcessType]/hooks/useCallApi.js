// WILL BE DEPRECATED IN THE NEXT PR
import { convertToNumber, MagicString, toArray } from '@/lib'
import { useStoreActions } from 'easy-peasy'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import { DeleteOutlined, Save } from '@mui/icons-material'
import {
  convertObjToArr,
  keyValueArr,
  actionItemSetter,
  deleteActionItemsCurrentState,
} from '../funcs'
import { useForm } from 'react-hook-form'
import useRequestActionItems from './useRequestActionItems'

const useCallApi = (element, action, actionItemsInfo) => {
  const { actionItems, setActionItems } = actionItemsInfo

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const headers = convertObjToArr({ obj: element?.actionItemSpecs?.callApiParams?.headers ?? {} })
  const body = convertObjToArr({ obj: element?.actionItemSpecs?.callApiParams?.body ?? {} })

  const { control, handleSubmit, watch, getValues, setValue } = useForm({
    defaultValues: {
      isRequired: element?.isRequired ?? false,
      isEnabled: element?.isEnabled ?? false,
      method: element?.actionItemSpecs?.callApiParams?.method ?? '',
      url: element?.actionItemSpecs?.callApiParams?.url ?? '',
      title: element?.actionItemSpecs?.callApiParams?.title ?? '',
      position: element?.position ?? 1,
      headers: toArray(headers),
      body: toArray(body),
    },
  })

  // TO-DO: Change by useBoolean()
  const [open, setOpen] = useState(false)

  const handleOpenClose = useCallback(() => {
    setOpen((prevState) => !prevState)
  }, [])

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
    const currentValues = getValues()
    const value = structBody(currentValues)
    actionItemSetter({ response, actionItems, setActionItems, value })
  }

  const [funcsReq, valReq] = useRequestActionItems({
    setInfoToActionsItems,
    actionItems,
    setActionItems,
  })

  const { postElement, putElement, deleteElement } = funcsReq
  const { loading } = valReq

  const structBody = (data = {}) => {
    return {
      isRequired: data?.isRequired ?? false,
      isEnabled: data?.isEnabled ?? false,
      position: convertToNumber(data?.position) ?? 1,
      actionItemSpecs: {
        callApiParams: {
          method: data?.method ?? '',
          url: data?.url ?? '',
          title: data?.title ?? '',
          body: keyValueArr(data?.body),
          headers: keyValueArr(data?.headers),
        },
      },
    }
  }

  const handleSaveElement = (data) => {
    const dataSend = structBody(data)

    // TODO: if (!conditionState(data)) {
    //   toast.error('No hay cambios por agregar')
    //   return
    // }

    const body = {
      idTaskAction: action.id,
      id: element.id,
      ...dataSend,
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

  const iconActions = [
    {
      title: 'Guardar elemento',
      icon: <Save />,
      type: 'submit',
    },
    {
      title: 'Eliminar elemento',
      icon: <DeleteOutlined />,
      onClick: () => {
        handleDeleteElement(action, element)
      },
      hoverColor: 'red',
    },
  ]

  const stateVars = {
    loadingElement: loading,
    iconActions,
    open,
    control,
  }
  const stateFns = {
    handleSaveElement,
    handleOpenClose,
    handleSubmit,
    watch,
    setValue,
    getValues,
  }
  return [stateVars, stateFns]
}

export default useCallApi
