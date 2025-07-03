import { useStoreActions } from 'easy-peasy'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import useDependenciesRequest from './useDependenciesRequest'
import { MagicString } from '@/lib'

const useNodeHierarchy = (id, data) => {
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const creationStructDependency = {
    parentId: id,
    label: '',
    isActive: true,
    identification: '',
    TRDcode: '',
  }

  const editStructDependency = data

  const [modalStruct, setModalStruct] = useState({
    openModal: false,
    id: id,
    ...data,
  })

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {},
  })

  const compareValuesToCancelModal = ({ evaCondition = false }) => {
    const evaluated = evaCondition ? creationStructDependency : editStructDependency

    const name = watch('name')
    const isActive = watch('isActive')
    const parentId = watch('parentId')
    const identification = watch('identification')
    const TRDcode = watch('TRDcode')

    return (
      name !== evaluated?.label ||
      isActive !== evaluated?.isActive ||
      parentId !== evaluated?.parentId ||
      identification !== evaluated?.identification ||
      TRDcode !== evaluated?.TRDcode
    )
  }

  const handleSetDefaultValues = useCallback(() => {
    setValue('parentId', modalStruct?.parentId)
    setValue('name', modalStruct?.label)
    setValue('identification', modalStruct?.identification)
    setValue('TRDcode', modalStruct?.TRDcode)
    if (!data?.setIsActive) {
      setValue('isActive', modalStruct?.isActive)
    }
  }, [setValue, modalStruct, data])

  useEffect(() => {
    handleSetDefaultValues()
  }, [modalStruct, handleSetDefaultValues])

  const handleSetOpen = () => {
    setModalStruct((prevState) => {
      return { ...prevState, openModal: !prevState.openModal }
    })
  }

  const { dependencyUpd, dependencyCre, isLoading } = useDependenciesRequest(handleSetOpen, id)

  const setInfoDependency = (dependencyAct) => {
    handleSetOpen()
    setModalStruct((prevState) => {
      return { ...prevState, ...dependencyAct }
    })
  }

  const verifiedParentId = (body, mutation) => {
    if (body.parentId && body.parentId !== 'origen') {
      mutation(body)
      return
    } else if (body.parentId === 'origen') {
      mutation({ ...body, parentId: null })
      return
    }
    toast.error('Debe seleccionar una dependencia existente como padre para esta dependencia.')
  }

  const createDependency = (data) => {
    const body = { ...data, idHierarchy: '', method: 'post' }
    verifiedParentId(body, dependencyCre)
  }

  const updateDependency = (data, id) => {
    const parentIdData = !data.parentId ? null : data.parentId
    const body = { ...data, idHierarchy: id, parentId: parentIdData, method: 'put' }
    verifiedParentId(body, dependencyUpd)
  }

  const onSubmit = (data) => {
    const petitionMethod = modalStruct.id === modalStruct.parentId
    if (!petitionMethod) {
      updateDependency(data, modalStruct.id)
      return
    }
    createDependency(data)
  }

  const handleCancel = () => {
    const creation = modalStruct.id === modalStruct.parentId

    const valueEvaluated = compareValuesToCancelModal({ evaCondition: creation })

    if (!valueEvaluated) {
      handleSetOpen()
      return
    }

    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: creation ? MagicString.MODAL.CANCEL_CREATE : MagicString.MODAL.CANCEL_EDIT,
      content: MagicString.MODAL.CLOSE_MODAL,
      onConfirm: () => {
        handleSetOpen()
      },
    })
  }

  const modalButtons = [
    {
      label: 'Cancelar',
      type: 'button',
      color: 'secondary',
      onClick: handleCancel,
    },
    {
      label: 'Guardar',
      type: 'submit',
      color: 'primary',
    },
  ]

  const stateVar = {
    modalStruct,
    modalButtons,
    control,
    creationStructDependency,
    editStructDependency,
    isLoading,
  }
  const stateFunc = {
    onSubmit,
    setInfoDependency,
    handleSubmit,
    handleSetOpen,
    setValue,
  }
  return [stateVar, stateFunc]
}

export default useNodeHierarchy
