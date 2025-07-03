import { useStoreState } from 'easy-peasy'
import { BackdropLoading, GenericForm, toArray } from '@/libV4'

import { ModifierActionsContent } from '../subcomponentsActions'
import { INPUTS_GENERATE_DOCUMENT } from '../constants'

// TO-DO: MOVE THIS HOOK TO A GLOBAL HOOKS FOLDER
import { useGenericActionItem } from '../../../hooks'
// TO-DO: MOVE THIS FUNCTION TO A GLOBAL FUNCS FOLDER
import { actionButtons } from '../../../funcs'

// TO-DO:
// PARA OPTIMIZAR ESTE COMPONENTE, LAS PETICIONES DEBERIAN ESTAR EN EL ACTION CONTENT Y NO EN CADA ELEMENTO

const ElementDocumentGeneration = ({ element, action, actionItemsInfo }) => {
  const { actionItems } = actionItemsInfo
  const variationParams = useStoreState((actions) => actions.reactFlowState.variationParams)
  const idProcessType = useStoreState((actions) => actions.reactFlowState.idProcessType)

  const elementToSendNonItemSpecs = {
    description: element?.description ?? '',
    idTemplate: element?.idTemplate ?? null,
  }

  if (variationParams?.byActionTypes === 'fiscal') {
    elementToSendNonItemSpecs.idDocumentRetentionTable = element?.idDocumentRetentionTable ?? null
  }

  const [stateVars, stateFns] = useGenericActionItem({
    action,
    element,
    actionItemsInfo,
    elementToSendNonItemSpecs,
  })

  const { control, loadingElement } = stateVars
  const { handleSaveElement, handleSubmit, handleDeleteElement, watch } = stateFns

  const template = watch('idTemplate')

  const toggleDisabledTemplate = (id) =>
    template === id ||
    template?.id === id ||
    toArray(actionItems)?.some(
      (item) => item?.id !== element?.id && (item?.idTemplate === id || item?.idTemplate?.id === id)
    )

  const filterOptionsTemplate = (options) => {
    return options?.filter((option) => {
      const isCurrentTemplate = template === option?.id || template?.id === option?.id
      const isOptionSelected = toArray(actionItems)?.some(
        (item) => item?.idTemplate === option?.id || item?.idTemplate?.id === option?.id
      )

      return isCurrentTemplate || !isOptionSelected
    })
  }

  const inputs = INPUTS_GENERATE_DOCUMENT({
    idProcessType,
    isDisabled: loadingElement,
    enabledInputTRD: variationParams?.byActionTypes === 'fiscal',
    toggleDisabledTemplate,
    filterOptionsTemplate,
  })

  const actionsButtons = actionButtons({ handleDelete: handleDeleteElement, action, element })

  const onSubmit = (data) => {
    const { ...restData } = data

    const objSend = {
      ...restData,
      idTemplate: data?.idTemplate?.id ?? data?.idTemplate ?? null,
    }

    if (variationParams?.byActionTypes === 'fiscal') {
      objSend.idDocumentRetentionTable =
        data?.idDocumentRetentionTable?.id ?? data?.idDocumentRetentionTable ?? null
    }

    handleSaveElement(objSend)
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

export default ElementDocumentGeneration
