// GENERIC ACTION ITEM FOR REVIEW AND SIGN DOCUMENTS
import { useStoreState } from 'easy-peasy'
import { BackdropLoading, GenericForm } from '@/libV4'

import { ModifierActionsContent } from '../subcomponentsActions'
import { INPUTS_REVIEW_DOCUMENT } from '../constants'

// TO-DO: MOVE THIS HOOK TO A GLOBAL HOOKS FOLDER
import { useGenericActionItem } from '../../../hooks'
// TO-DO: MOVE THIS FUNCTION TO A GLOBAL FUNCS FOLDER
import { actionButtons } from '../../../funcs'
import { toArray } from '@/lib'

const ElementDocuments = ({ element, action, actionItemsInfo }) => {
  const { actionItems } = actionItemsInfo

  const elementToSendNonItemSpecs = {
    idActionItemRel: element?.idActionItemRel ?? null,
  }

  const variationParams = useStoreState((actions) => actions.reactFlowState.variationParams)
  const idProcessType = useStoreState((actions) => actions.reactFlowState.idProcessType)

  const [stateVars, stateFns] = useGenericActionItem({
    action,
    element,
    actionItemsInfo,
    elementToSendNonItemSpecs,
  })

  const { control, loadingElement } = stateVars
  const { handleSaveElement, watch, handleSubmit, handleDeleteElement } = stateFns

  const document = watch('idActionItemRel')

  const toggleDisabled = (id) =>
    document === id ||
    document?.id === id ||
    toArray(actionItems)?.some(
      (item) =>
        item?.id !== element?.id &&
        (item?.idActionItemRel === id || item?.idActionItemRel?.id === id)
    )

  const filterOptions = (options) => {
    return options?.filter((option) => {
      const isCurrentDocument = document === option?.id || document?.id === option?.id
      const isOptionSelected = toArray(actionItems)?.some(
        (item) => item?.idActionItemRel === option?.id || item?.idActionItemRel?.id === option?.id
      )

      return isCurrentDocument || !isOptionSelected
    })
  }

  const inputs = INPUTS_REVIEW_DOCUMENT({
    idProcessType,
    isDisabled: loadingElement,
    builderService: variationParams?.builderService,
    toggleDisabled,
    filterOptions,
  })

  const actionsButtons = actionButtons({ handleDelete: handleDeleteElement, action, element })

  const onSubmit = (data) => {
    const { idActionItemRel, ...restData } = data
    const { idTaskAction } = idActionItemRel

    handleSaveElement({
      ...restData,
      idTaskActionRel: idTaskAction,
      idActionItemRel: idActionItemRel?.id ?? idActionItemRel ?? null,
    })
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
            inputs={inputs}
            control={control}
          />
        </div>
        <ModifierActionsContent
          control={control}
          actionsButtons={actionsButtons}
          loadingElement={loadingElement}
        />
      </form>
    </div>
  )
}

export default ElementDocuments
