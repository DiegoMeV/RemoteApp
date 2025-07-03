// DELETE IN NEXT PR
import { ClassicIconButton, MagicString } from '@/lib'
import { useStoreActions } from 'easy-peasy'
import { useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { defaultColumns } from './funcs'

import { CheckCircle, DeleteOutlined, Save } from '@mui/icons-material'
import { actionItemSetter, deleteActionItemsCurrentState } from '../funcs'
import useRequestActionItems from './useRequestActionItems'

const useGeneralReviewAction = ({ element, action, actionItemsInfo, message }) => {
  const { actionItems, setActionItems } = actionItemsInfo

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const [openApproved, setOpenApproved] = useState(false)
  const [openRejected, setOpenRejected] = useState(false)

  const handleOpenCloseApproved = useCallback(() => {
    setOpenApproved((prevState) => !prevState)
  }, [setOpenApproved])

  const handleOpenCloseRejected = useCallback(() => {
    setOpenRejected((prevState) => !prevState)
  }, [setOpenRejected])

  const [value, setValue] = useState({
    isRequired: element?.isRequired ?? false,
    isEnabled: element?.isEnabled ?? false,
    idTaskOnApproved: element?.idTaskOnApproved ?? '',
    idTaskOnRejected: element?.idTaskOnRejected ?? '',
    nameTaskOnApproved: element?.TaskOnApproved?.name ?? '',
    nameTaskOnRejected: element?.TaskOnRejected?.name ?? '',
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

  const conditionState = () => {
    return (
      value?.isRequired !== element?.isRequired ||
      value?.isEnabled !== element?.isEnabled ||
      value?.idTaskOnApproved !== element?.idTaskOnApproved ||
      value?.idTaskOnRejected !== element?.idTaskOnRejected
    )
  }

  const handleChange = (ev) => {
    const { name, value: elementValue, checked } = ev.target

    setValue({
      ...value,
      [name]: name === 'isRequired' || name === 'isEnabled' ? checked : elementValue,
    })
  }

  const handleSaveElement = (currentAction, currentElement) => {
    if (!conditionState()) {
      toast.error(MagicString.CONSTRUCTOR.ERROR_MESSAGE_NO_CHANGES)
      return
    }

    const body = {
      idTaskAction: currentAction.id,
      id: currentElement.id,
      ...value,
    }

    delete body.nameTaskOnApproved
    delete body.nameTaskOnRejected

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

  const [funcsReq, valReq] = useRequestActionItems({
    setInfoToActionsItems: (response) => {
      actionItemSetter({ response, actionItems, setActionItems, value })
    },
    actionItems,
    setActionItems,
  })

  const { postElement, putElement, deleteElement } = funcsReq
  const { loading } = valReq

  const onConfirmSetApproved = useCallback(
    (params) => {
      setValue({
        ...value,
        idTaskOnApproved: params.row.id ?? '',
        nameTaskOnApproved: params.row.activity ?? '',
      })
    },
    [setValue, value]
  )

  const onConfirmSetRejected = useCallback(
    (params) => {
      setValue({
        ...value,
        nameTaskOnRejected: params?.row?.activity ?? '',
        idTaskOnRejected: params?.row?.id ?? '',
      })
    },
    [setValue, value]
  )

  const handleSetActivity = useCallback(
    (params, onConfirmSet, onClose) => {
      setConfirmAlertProps({
        open: true,
        icon: 'warning',
        title: 'Seleccion actividad',
        content: `Esta seguro de escoger ${params.row.activity} como actividad para ${message}?`,
        onConfirm: () => {
          onConfirmSet(params)
          onClose()
          toast.success('Actividad seleccionada')
        },
      })
    },
    [message, setConfirmAlertProps]
  )

  //TODO: Pasar a otro archivo
  const columnsForApproved = useMemo(() => {
    return [
      ...defaultColumns,
      {
        field: 'options',
        headerName: '',
        width: 60,
        sortable: false,
        disableColumnMenu: true,
        resizable: false,
        editable: false,
        headerAlign: 'center',
        renderCell: (params) => (
          <ClassicIconButton
            onClick={() => {
              handleSetActivity(params, onConfirmSetApproved, handleOpenCloseApproved)
            }}
            color='success'
          >
            <CheckCircle />
          </ClassicIconButton>
        ),
      },
    ]
  }, [handleSetActivity, onConfirmSetApproved, handleOpenCloseApproved])

  //TODO: Pasar a otro archivo
  const columnsForRejected = useMemo(() => {
    return [
      ...defaultColumns,
      {
        field: 'options',
        headerName: '',
        width: 60,
        sortable: false,
        disableColumnMenu: true,
        resizable: false,
        editable: false,
        headerAlign: 'center',
        renderCell: (params) => (
          <ClassicIconButton
            onClick={() => {
              handleSetActivity(params, onConfirmSetRejected, handleOpenCloseRejected)
            }}
            color='success'
          >
            <CheckCircle />
          </ClassicIconButton>
        ),
      },
    ]
  }, [handleSetActivity, onConfirmSetRejected, handleOpenCloseRejected])

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
      type: 'button',
    },
  ]

  const stateVars = {
    loadingElement: loading,
    columnsForApproved,
    columnsForRejected,
    value,
    iconActions,
    openApproved,
    openRejected,
  }
  const stateFns = {
    handleChange,
    handleSaveElement,
    setValue,

    handleOpenCloseApproved,
    handleOpenCloseRejected,
  }
  return [stateVars, stateFns]
}

export default useGeneralReviewAction
