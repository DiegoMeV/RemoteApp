import { useStoreState } from 'easy-peasy'
import { BackdropLoading, GenericForm } from '@/libV4'

import { ModifierActionsContent } from '../subcomponentsActions'
import { INPUTS_ASSINGMENT } from '../constants'

// TO-DO: MOVE THIS HOOK TO A GLOBAL HOOKS FOLDER
import { useGenericActionItem } from '../../../hooks'
// TO-DO: MOVE THIS FUNCTION TO A GLOBAL FUNCS FOLDER
import { actionButtons } from '../../../funcs'

const ElementAssignment = ({ element, action, actionItemsInfo }) => {
  const variationParams = useStoreState((actions) => actions.reactFlowState.variationParams)
  const idProcessType = useStoreState((actions) => actions.reactFlowState.idProcessType)

  const { actionType } = actionItemsInfo

  const isActor = actionType === 'ADD_PROCESS_ACTOR'
  const isBackToPrevActivity = actionType === 'BACK_TO_PREV_ACTIVITY'

  const elementToSendNonItemSpecs = {
    idTaskRel: element?.idTaskRel ?? null,
  }

  if (isActor) {
    elementToSendNonItemSpecs.idActorType = element?.idActorType ?? null
  }

  const [stateVars, stateFns] = useGenericActionItem({
    action,
    element,
    actionItemsInfo,
    elementToSendNonItemSpecs,
  })

  const { control, loadingElement } = stateVars
  const { handleSaveElement, handleSubmit, handleDeleteElement } = stateFns

  // TO-DO: Remove QuerySearch from autocompleteRequest - GenericAutocompleteRequest of GenericForm, It's not needed in this case
  const inputs = INPUTS_ASSINGMENT({
    isActor,
    idProcessType,
    isBackToPrevActivity,
    isDisabled: loadingElement,
    builderService: variationParams?.builderService,
  })

  const actionsButtons = actionButtons({ handleDelete: handleDeleteElement, action, element })

  const onSubmit = (data) => {
    // TO-DO: Revisar idTaskRel, ya que que pasa cuando el usuario elimina
    // la asignacion que tenia para la tarea relacionada, la conexion deberia eliminarse, lo cual
    // deberia ser que yo en el campo idTaskRel enviaria null

    const { idTaskRel, idActorType, ...restData } = data
    const dataToSend = {
      ...restData,
      ...(idTaskRel?.id || idTaskRel ? { idTaskRel: idTaskRel?.id ?? idTaskRel } : {}),
      ...(idActorType?.id || idActorType ? { idActorType: idActorType?.id ?? idActorType } : {}),
    }

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

export default ElementAssignment
