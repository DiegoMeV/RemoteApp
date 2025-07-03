// TO-DO: Start updating this component and the hook
import { Box, Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { AdvanceButtonAction, ContainerPrimaryActionButtons, SummaryActionName } from '.'
import { useActions } from '../hooks'
import { sxAccordionStyles } from '../styles'
import { elementForAction, iconsForAccordion } from '../funcs'
import { BackdropLoading } from '@/lib'
import { ContentVLNoForm } from './Actions/subcomponentsActions'

const AccordionGeneralReview = ({ data, actionType, actionInfo, idApplication }) => {
  const [stateVars, stateFns] = useActions(data, actionInfo)

  const { value, expandAccordion, loading, actionItems } = stateVars
  const {
    handleSaveAction,
    handleDeleteAction,
    handleAddElement,
    handleChange,
    setExpandAccordion,
    setActionItems,
    refetchActionItems,
    setValue,
  } = stateFns

  const IconAccordion = iconsForAccordion[actionType] || iconsForAccordion.default
  const ElementAction = elementForAction[actionType] || elementForAction.default

  const isDisabled =
    !(
      actionType === 'CALL_API' ||
      actionType === 'AUTOMATIC_ACTION' ||
      actionType === 'CALL_ORACLE_FORM' ||
      actionType === 'SIIFWEB_BIND_FINANTIAL_DOC' ||
      actionType === 'BIND_PROCESSES' ||
      actionType === 'SIGN_DOCUMENT' ||
      actionType === 'NUMBERING_DOCUMENT' ||
      actionType === 'GENERATE_DOCUMENT' ||
      actionType === 'ASSIGNMENT_TO_USER' ||
      actionType === 'ADD_PROCESS_ACTOR' ||
      actionType === 'UPLOAD_DOCUMENT' ||
      actionType === 'SAVE_FORM' ||
      actionType === 'SUBPROCESS' ||
      actionType === 'DOWNLOAD_DOCUMENT' ||
      actionType === 'BACK_TO_PREV_ACTIVITY' ||
      actionType === 'REVIEW_DOCUMENT'
    ) && actionItems?.length >= 1

  const nonActionsItems = actionType === 'ALERTS_REVIEW'

  const isReviewAction = actionType === 'REVIEW_DOCUMENT'

  // TO-DO: Para el LibV4 no usar Mui
  return (
    <Accordion
      expanded={expandAccordion}
      onChange={() => {
        setExpandAccordion((prevState) => !prevState)
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <BackdropLoading loading={loading} />
        <Box sx={sxAccordionStyles.accordionSummaryGenerationContainer}>
          <SummaryActionName
            icon={<IconAccordion />}
            handleChange={handleChange}
            value={value}
            data={data}
          />
          <AdvanceButtonAction
            value={value}
            handleDeleteAction={handleDeleteAction}
            handleSaveAction={handleSaveAction}
            handleChange={handleChange}
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          rowGap={1}
          sx={sxAccordionStyles.accordionSummaryElementContainer}
        >
          {isReviewAction && (
            <ContentVLNoForm
              value={value}
              handleChange={handleChange}
              setValue={setValue}
            />
          )}
          <ContainerPrimaryActionButtons
            value={value}
            handleAddElement={handleAddElement}
            handleChange={handleChange}
            disabled={isDisabled}
            nonActionsItems={nonActionsItems}
          />
          {!nonActionsItems &&
            data &&
            actionItems
              ?.sort((a, b) => a?.position - b?.position)
              ?.map((element, index) => {
                return (
                  <Box
                    key={`${element.id}-${index}`}
                    sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
                  >
                    <ElementAction
                      element={element}
                      action={data}
                      idApplication={idApplication}
                      actionItemsInfo={{
                        actionItems,
                        setActionItems,
                        refetchActionItems,
                        actionType,
                      }}
                    />
                  </Box>
                )
              })}
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default AccordionGeneralReview
