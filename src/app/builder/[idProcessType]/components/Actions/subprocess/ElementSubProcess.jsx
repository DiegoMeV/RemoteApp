import { useStoreState } from 'easy-peasy'
import { BackdropLoading, GenericForm } from '@/libV4'

import { ModifierActionsContent } from '../subcomponentsActions'
import { INPUTS_SUBPROCESS } from '../constants'

// TO-DO: MOVE THIS HOOK TO A GLOBAL HOOKS FOLDER
import { useGenericActionItem } from '../../../hooks'
// TO-DO: MOVE THIS FUNCTION TO A GLOBAL FUNCS FOLDER
import { actionButtons } from '../../../funcs'

const ElementSubProcess = ({ element, action, actionItemsInfo, idApplication }) => {
  const variationParams = useStoreState((actions) => actions.reactFlowState.variationParams)

  const elementToSendNonItemSpecs = {
    description: element?.description ?? '',
    idProcessTypeRel: element?.idProcessTypeRel ?? '',
  }

  const [stateVars, stateFns] = useGenericActionItem({
    action,
    element,
    actionItemsInfo,
    elementToSendNonItemSpecs,
  })

  const { control, loadingElement } = stateVars
  const { handleSaveElement, handleSubmit, handleDeleteElement } = stateFns

  const inputs = INPUTS_SUBPROCESS({
    idApplication,
    isDisabled: loadingElement,
    builderService: variationParams?.builderService,
  })

  const actionsButtons = actionButtons({ handleDelete: handleDeleteElement, action, element })

  const onSubmit = (data) => {
    const { idProcessTypeRel, ...restData } = data
    const dataToSend = {
      ...restData,
      idProcessTypeRel: idProcessTypeRel?.id ?? idProcessTypeRel,
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

export default ElementSubProcess
