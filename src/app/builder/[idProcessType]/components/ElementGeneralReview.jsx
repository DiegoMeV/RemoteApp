import { Box } from '@mui/material'
import { sxAccordionStyles } from '../styles'
import { ElementButtons, ElementInputsGeneralReview } from '.'
import { useGeneralReviewAction } from '../hooks'

const ElementGeneralReview = ({ element, action, actionItemsInfo }) => {
  const messageByAction = 'Revision General'
  const [stateVars, stateFns] = useGeneralReviewAction({
    element,
    action,
    actionItemsInfo,
    message: messageByAction,
  })

  const {
    loadingElement,
    columnsForApproved,
    columnsForRejected,
    value,
    iconActions,
    openApproved,
    openRejected,
  } = stateVars

  const {
    handleChange,
    handleSaveElement,
    setValue,
    handleOpenCloseApproved,
    handleOpenCloseRejected,
  } = stateFns

  return (
    <Box sx={sxAccordionStyles.accordionElementGenerationContainer}>
      <Box
        component='form'
        onSubmit={(ev) => {
          ev.preventDefault()
          handleSaveElement(action, element)
        }}
        sx={sxAccordionStyles.accordionElementGeneration}
      >
        <ElementInputsGeneralReview
          value={value}
          columnsForApproved={columnsForApproved}
          columnsForRejected={columnsForRejected}
          setValue={setValue}
          openApproved={openApproved}
          openRejected={openRejected}
          handleOpenCloseApproved={handleOpenCloseApproved}
          handleOpenCloseRejected={handleOpenCloseRejected}
        />
        <ElementButtons
          loadingElement={loadingElement}
          value={value}
          handleChange={handleChange}
          iconActions={iconActions}
        />
      </Box>
    </Box>
  )
}

export default ElementGeneralReview
