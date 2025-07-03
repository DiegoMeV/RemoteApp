import { Box } from '@mui/material'
import { ContentSwitch } from '../subcomponentsActions'
import { sxAccordionStyles } from '../../../styles'
import { BackdropLoading, ClassicIconButton } from '@/lib'
import { useGenericActionItem } from '../../../hooks'
import { iconActions, ITEMS_PROCESS_TRANSFER } from '../../../funcs'
import { GenericForm } from '@/libV4'

const ElementProcessTransfer = ({ element, action, actionItemsInfo }) => {
  const elementToSendNonItemSpecs = {
    idOfficeExec: element?.idOfficeExec ?? null,
  }

  const [stateVars, stateFns] = useGenericActionItem({
    action,
    element,
    actionItemsInfo,
    elementToSendNonItemSpecs,
  })

  const { control, loadingElement } = stateVars
  const { handleSaveElement, watch, handleSubmit, handleDeleteElement } = stateFns

  const idOfficeExec = watch('idOfficeExec')

  const toggleDisabled = (id) => idOfficeExec === id || idOfficeExec?.id === id

  const inputs = ITEMS_PROCESS_TRANSFER({
    isDisabled: loadingElement,
    toggleDisabled,
  })

  const actionsButtons = iconActions(handleDeleteElement, action, element)

  const onSubmit = (data) => {
    const { idOfficeExec, ...restData } = data
    handleSaveElement({ ...restData, idOfficeExec: idOfficeExec?.id ?? idOfficeExec })
  }

  // TO-DO: Use ContainerActionItems
  return (
    <Box sx={sxAccordionStyles.accordionElementGenerationContainer}>
      <BackdropLoading loading={loadingElement} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full flex flex-col border border-lightGray rounded-[10px] p-5 justify-center'
      >
        <div className='general_form_container'>
          <GenericForm
            inputs={inputs}
            control={control}
          />
        </div>
        <Box sx={sxAccordionStyles.accordionElementGenerationBtns}>
          <ContentSwitch control={control} />
          <Box>
            {actionsButtons.map((action, index) => (
              <ClassicIconButton
                onClick={action?.onClick}
                key={index}
                hoverColor={action?.hoverColor}
                title={action?.title}
                placement='bottom'
                color='default'
                type={action?.type}
                disabled={loadingElement}
              >
                {action?.icon}
              </ClassicIconButton>
            ))}
          </Box>
        </Box>
      </form>
    </Box>
  )
}

export default ElementProcessTransfer
