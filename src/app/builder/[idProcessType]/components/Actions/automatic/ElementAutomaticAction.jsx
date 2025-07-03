import { Box } from '@mui/material'
import { sxAccordionStyles } from '../../../styles'
import { BackdropLoading, ClassicIconButton, CustomModal, GenericForm, useBoolean } from '@/lib'

import { useGenericActionItem } from '../../../hooks'
import { ContentSwitch } from '../subcomponentsActions'
import { actionsModal, iconActions, ITEMS_AUTOMATIC_ACTION_EV } from '../../../funcs'
import { ButtonsOpenModal } from './ui'
import { ModalConfigParameters } from '../callOracleForm/ui'

const ElementAutomaticAction = ({ element, action, actionItemsInfo }) => {
  const elementToSend = {
    automatedTaskParams: {
      taskBody: element?.actionItemSpecs?.automatedTaskParams?.taskBody ?? null,
      taskParams: element?.actionItemSpecs?.automatedTaskParams?.taskParams ?? null,
    },
  }
  const [stateVars, stateFns] = useGenericActionItem({
    element,
    action,
    actionItemsInfo,
    elementToSend,
  })

  const { control, loadingElement } = stateVars
  const { handleSaveElement, handleSubmit, handleDeleteElement, watch, setValue, getValues } =
    stateFns

  const actionsButtons = iconActions(handleDeleteElement, action, element)

  const modalEvCode = useBoolean()
  const modalParams = useBoolean()

  const btnActions = actionsModal({ modal: modalEvCode })

  const evInput = ITEMS_AUTOMATIC_ACTION_EV({ isDisabled: loadingElement })

  const handleSaveEv = (data) => {
    handleSaveElement(data)
    modalEvCode?.handleShow()
  }

  return (
    <Box sx={sxAccordionStyles.accordionElementGenerationContainer}>
      <BackdropLoading loading={loadingElement} />
      <Box
        component='form'
        onSubmit={handleSubmit(handleSaveElement)}
        sx={sxAccordionStyles.accordionElementGeneration}
      >
        <ButtonsOpenModal
          control={control}
          modalEvCode={modalEvCode}
          modalParams={modalParams}
        />
        <Box sx={sxAccordionStyles.accordionElementGenerationBtns}>
          <ContentSwitch control={control} />
          <Box>
            {actionsButtons.map((action, index) => (
              <ClassicIconButton
                onClick={action.onClick}
                key={index}
                hoverColor={action.hoverColor}
                title={action.title}
                placement='bottom'
                color='default'
                type={action.type}
              >
                {action.icon}
              </ClassicIconButton>
            ))}
          </Box>
        </Box>
      </Box>
      {modalEvCode?.show && (
        <CustomModal
          title='Eventos'
          size='xl'
          open={modalEvCode?.show}
          handleClose={modalEvCode?.handleShow}
          modalType={'form'}
          onSubmit={handleSubmit(handleSaveEv)}
          actions={btnActions}
        >
          <GenericForm
            inputs={evInput}
            control={control}
          />
        </CustomModal>
      )}
      {modalParams?.show && (
        <ModalConfigParameters
          open={modalParams?.show}
          control={control}
          handleClose={modalParams?.handleShow}
          watch={watch}
          arrayName={'actionItemSpecs.automatedTaskParams.taskParams'}
          setValue={setValue}
          element={element}
          handleSaveElement={handleSaveElement}
          getValues={getValues}
        />
      )}
    </Box>
  )
}

export default ElementAutomaticAction
