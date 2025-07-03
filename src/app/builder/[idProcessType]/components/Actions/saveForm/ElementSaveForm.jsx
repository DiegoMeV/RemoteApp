import { BackdropLoading, CustomModal, GenericForm, useBoolean } from '@/libV4'

import { ModifierActionsContent } from '../subcomponentsActions'
import { INPUTS_SAVE_FORM } from '../constants'

// TO-DO: MOVE THIS HOOK TO A GLOBAL HOOKS FOLDER
import { useGenericActionItem } from '../../../hooks'
// TO-DO: MOVE THIS FUNCTION TO A GLOBAL FUNCS FOLDER
import { actionButtons } from '../../../funcs'
import { TuneOutlined } from '@mui/icons-material'
import { ModalAdvanceSaveForm } from './components'
import { useFieldArray, useForm } from 'react-hook-form'
import { useState } from 'react'
import toast from 'react-hot-toast'

const ElementSaveForm = ({ element, action, actionItemsInfo }) => {
  const [stateVars, stateFns] = useGenericActionItem({
    action,
    element,
    actionItemsInfo,
    // elementToSendNonItemSpecs,
  })

  const { control, loadingElement } = stateVars
  const { handleSaveElement, handleSubmit, handleDeleteElement, watch } = stateFns

  const [confirmData, setConfirmData] = useState(false)
  const [configData, setConfigData] = useState(false)

  const modalAdvanceConfig = useBoolean()

  // TO-DO: Pendiente implementacion
  // actionItemSpecs: toArray(value?.options),
  const formAdvanceConfig = useForm({
    defaultValues: {},
  })

  // TO-DO: Pendiente implementacion
  // const { control, handleSubmit, setValue, getValues } = useForm({
  //   defaultValues: {
  //     actionItemSpecs: toArray(value?.options),
  //   },
  // })

  const fieldArray = useFieldArray({
    control,
    name: 'actionItemSpecs',
  })

  const inputs = INPUTS_SAVE_FORM({
    isDisabled: loadingElement,
  })

  const variableType = watch('variableType')

  // TO-DO: Pendiente crear validaciones
  const handleValidateInfo = ({ data, variableType }) => {
    if (data && variableType) return true
    return false
  }

  const onSubmitAdvanceConfig = (data) => {
    const validationData = handleValidateInfo({
      data,
      variableType,
    })

    setConfirmData(validationData)
    if (!validationData) return

    setConfigData(data)

    modalAdvanceConfig?.handleShow()
  }

  const onSubmit = (data) => {
    const payload = { ...data, ...configData }

    if (!confirmData) {
      toast.error('Por favor, valide la información antes de guardar')
      return
    }

    handleSaveElement(payload)
  }

  const actionsButtons = [
    {
      label: 'Configuración avanzada',
      icon: <TuneOutlined />,
      disabled: !variableType,
      onClick: modalAdvanceConfig?.handleShow,
    },
    ...actionButtons({ handleDelete: handleDeleteElement, action, element }),
  ]

  const actionBtnModal = [
    {
      label: 'Cancelar',
      onClick: modalAdvanceConfig?.handleShow,
      color: 'secondary',
    },
    {
      label: 'Guardar',
      type: 'submit',
    },
  ]

  return (
    <div className='w-full flex items-center my-[5px]'>
      {loadingElement && <BackdropLoading loading={loadingElement} />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full flex flex-col border border-lightGray rounded-[10px] p-5 justify-center gap-4'
      >
        <div className='general_form_container'>
          <GenericForm
            inputs={inputs}
            control={control}
          />
        </div>
        <ModifierActionsContent
          control={control}
          actionsButtons={[...actionsButtons]}
          loadingElement={loadingElement}
        />
      </form>
      {modalAdvanceConfig?.show && (
        <CustomModal
          size='sm'
          modalType='form'
          maxHeight='40vh'
          actions={actionBtnModal}
          title='Configuración avanzada'
          open={modalAdvanceConfig?.show}
          handleClose={modalAdvanceConfig?.handleShow}
          onSubmit={formAdvanceConfig.handleSubmit(onSubmitAdvanceConfig)}
        >
          <ModalAdvanceSaveForm
            fieldArray={fieldArray}
            form={formAdvanceConfig}
            variableType={variableType}
          />
        </CustomModal>
      )}
    </div>
  )
}

export default ElementSaveForm
