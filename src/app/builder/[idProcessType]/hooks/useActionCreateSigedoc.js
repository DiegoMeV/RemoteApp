// WILL BE DEPRECATED IN THE NEXT PR
import { MagicString } from '@/lib'
import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'

import { DeleteOutlined, Save } from '@mui/icons-material'
import { actionItemSetter, deleteActionItemsCurrentState } from '../funcs'
import { useForm } from 'react-hook-form'
import useRequestActionItems from './useRequestActionItems'

const useActionCreateSigedoc = ({ element, action, actionItemsInfo }) => {
  const { actionItems, setActionItems } = actionItemsInfo

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const { control, handleSubmit, watch, getValues } = useForm({
    defaultValues: {
      isRequired: element?.isRequired ?? false,
      isEnabled: element?.isEnabled ?? false,
      communications: element?.actionItemSpecs?.communications ?? '',
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

  const [funcsReq, valReq] = useRequestActionItems({
    setInfoToActionsItems: (response) => {
      const currentValues = getValues()
      const value = structBody(currentValues)
      actionItemSetter({ response, actionItems, setActionItems, value })
    },
    actionItems,
    setActionItems,
  })

  const { postElement, putElement, deleteElement } = funcsReq
  const { loading } = valReq

  const conditionState = (data) => {
    return (
      data?.isRequired !== element?.isRequired ||
      data?.isEnabled !== element?.isEnabled ||
      data?.communications !== element?.actionItemSpecs?.communications
    )
  }

  const structBody = (data = {}) => {
    return {
      isRequired: data.isRequired ?? false,
      isEnabled: data.isEnabled ?? false,
      actionItemSpecs: {
        communications: data.communications ?? '',
      },
    }
  }

  const handleSaveElement = (data) => {
    const dataSend = structBody(data)

    if (!conditionState(data)) {
      toast.error('No hay cambios por agregar')
      return
    }

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
      title: MagicString.CONSTRUCTOR.SAVE_ELEMENT,
      icon: <Save />,
      type: 'submit',
    },
    {
      title: MagicString.CONSTRUCTOR.DELETE_ELEMENT,
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
    control,
  }
  const stateFns = {
    handleSaveElement,
    handleSubmit,
    watch,
  }
  return [stateVars, stateFns]
}

export default useActionCreateSigedoc
