import { Box } from '@mui/material'
import { sxAccordionStyles } from '../../../styles'
import { ContentSwitch } from '../subcomponentsActions'
import { ClassicIconButton, useBoolean } from '@/lib'
import { useGenericActionItem } from '../../../hooks'
import { iconActions, ITEMS_CALL_ORACLE_FORM } from '../../../funcs'
import { moduleOptions } from '../constants'
import { ElementInteraction, ModalConfigParameters } from './ui'

const ElementOracleForm = ({ element, action, actionItemsInfo }) => {
  const elementToSend = {
    oracleFormCall: {
      module: element?.actionItemSpecs?.oracleFormCall?.module ?? null,
      option: element?.actionItemSpecs?.oracleFormCall?.option ?? null,
      parameters: element?.actionItemSpecs?.oracleFormCall?.parameters ?? {},
      genDoc: element?.actionItemSpecs?.oracleFormCall?.genDoc ?? false,
    },
  }

  const [stateVars, stateFns] = useGenericActionItem({
    element,
    action,
    actionItemsInfo,
    elementToSend,
  })

  const { control, loadingElement } = stateVars
  const { handleSaveElement, watch, handleSubmit, handleDeleteElement, setValue, getValues } =
    stateFns

  const inputs = ITEMS_CALL_ORACLE_FORM({
    isDisabled: loadingElement,
    options: moduleOptions ?? [],
  })

  const actionsButtons = iconActions(handleDeleteElement, action, element)

  const openModal = useBoolean()

  return (
    <Box sx={sxAccordionStyles.accordionElementGenerationContainer}>
      <Box
        component='form'
        onSubmit={handleSubmit(handleSaveElement)}
        sx={sxAccordionStyles.accordionElementGeneration}
      >
        <ElementInteraction
          inputs={inputs}
          control={control}
          openModal={openModal}
        />
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
              >
                {action?.icon}
              </ClassicIconButton>
            ))}
          </Box>
        </Box>
      </Box>
      {openModal?.show && (
        <ModalConfigParameters
          control={control}
          open={openModal?.show}
          handleClose={openModal?.handleShow}
          watch={watch}
          setValue={setValue}
          element={element}
          handleSaveElement={handleSaveElement}
          getValues={getValues}
        />
      )}
    </Box>
  )
}

export default ElementOracleForm
