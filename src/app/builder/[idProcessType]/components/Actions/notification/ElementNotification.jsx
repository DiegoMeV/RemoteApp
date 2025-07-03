import { useStoreState } from 'easy-peasy'
import { BackdropLoading, GenericForm, toArray } from '@/libV4'

import { ModifierActionsContent } from '../subcomponentsActions'
import { INPUTS_NOTIFICATIONS } from '../constants'

// TO-DO: MOVE THIS HOOK TO A GLOBAL HOOKS FOLDER
import { useGenericActionItem } from '../../../hooks'
// TO-DO: MOVE THIS FUNCTION TO A GLOBAL FUNCS FOLDER
import { actionButtons, getElementNotificationPayload } from '../../../funcs'
import { StyledDivider } from '@/lib'

const ElementNotification = ({ element, action, actionItemsInfo }) => {
  const { actionItems, actionType } = actionItemsInfo

  const variationParams = useStoreState((actions) => actions.reactFlowState.variationParams)
  const idProcessType = useStoreState((actions) => actions.reactFlowState.idProcessType)

  const isSendNotification = actionType === 'SEND_NOTIFICATION'

  const { elementToSend, elementToSendNonItemSpecs } = getElementNotificationPayload({
    actionType,
    element,
  })

  const [stateVars, stateFns] = useGenericActionItem({
    action,
    element,
    elementToSend,
    actionItemsInfo,
    elementToSendNonItemSpecs,
  })

  const { control, loadingElement } = stateVars
  const { handleSaveElement, handleSubmit, handleDeleteElement, watch } = stateFns

  const actionItemRel = watch('idActionItemRel')

  const toggleDisabled = (id) =>
    actionItemRel === id ||
    actionItemRel?.id === id ||
    toArray(actionItems)?.some(
      (item) =>
        item?.id !== element?.id &&
        (item?.idActionItemRel === id || item?.idActionItemRel?.id === id)
    )

  const filterOptions = (options) => {
    return options?.filter((option) => {
      const isCurrentDocument = actionItemRel === option?.id || actionItemRel?.id === option?.id
      const isOptionSelected = toArray(actionItems)?.some(
        (item) => item?.idActionItemRel === option?.id || item?.idActionItemRel?.id === option?.id
      )

      return isCurrentDocument || !isOptionSelected
    })
  }

  const { primaryInputs, secondaryInputs } = INPUTS_NOTIFICATIONS({
    actionType,
    idProcessType,
    filterOptions,
    toggleDisabled,
    isDisabled: loadingElement,
    builderService: variationParams?.builderService,
  })

  const actionsButtons = actionButtons({ handleDelete: handleDeleteElement, action, element })

  const onSubmit = (data) => {
    if (actionType !== 'CREATE_NOTIFICATION') {
      const { idActionItemRel, ...restData } = data
      const { idActivity, idTaskAction } = idActionItemRel

      handleSaveElement({
        ...restData,
        idTaskRel: idActivity,
        idTaskActionRel: idTaskAction,
        idActionItemRel: idActionItemRel?.id ?? idActionItemRel ?? null,
      })

      return
    }

    const dataToSend = { ...data }

    handleSaveElement(dataToSend)
  }

  return (
    <div className='w-full flex items-center my-[5px]'>
      {loadingElement && <BackdropLoading loading={loadingElement} />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full flex flex-col border border-lightGray rounded-[10px] p-5 justify-center gap-4'
      >
        <div className='general_form_container'>
          <GenericForm
            inputs={toArray(primaryInputs)}
            control={control}
          />
        </div>
        {isSendNotification && <StyledDivider />}
        {isSendNotification && secondaryInputs.length > 0 && (
          <div className='general_form_container'>
            <GenericForm
              inputs={toArray(secondaryInputs)}
              control={control}
            />
          </div>
        )}
        <ModifierActionsContent
          control={control}
          actionsButtons={actionsButtons}
          loadingElement={loadingElement}
        />
      </form>
    </div>
  )
}

export default ElementNotification
