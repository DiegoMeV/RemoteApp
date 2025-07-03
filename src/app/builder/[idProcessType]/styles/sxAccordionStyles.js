const accordionContainerHover = {
  width: '100%',
  '& .Mui-focusVisible ': {
    backgroundColor: '#0000000f !important',
  },
}

const accordionContainerDetails = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
  marginBottom: '10px',
}

const accordionNameTaskContainer = {
  display: 'flex',
  width: '100%',
  gap: '12px',
  paddingRight: '10px',
}

const accordionDescriptionTaskContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  mb: '10px',
  gap: '12px',
  pr: '30px',
}

const accordionSearchRoleContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  mb: '20px',
  gap: '12px',
  pr: '30px',
}

const accordionSummaryGenerationContainer = {
  display: 'flex',
  alignItems: 'center',
  width: '98%',
  justifyContent: 'space-between',
}

const accordionSummaryElementContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
}

const accordionElementGeneration = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  border: '1px solid',
  borderRadius: '10px',
  padding: '20px',
  borderColor: 'lightGray',
  justifyContent: 'center',
}

const accordionElementGenerationBtns = {
  display: 'flex',
  width: '100%',
  margin: '5px',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
}

const accordionContentModalDocuments = {
  p: '20px',
  mb: '15px',
  width: '100%',
  height: '100%',
  bgcolor: 'backgroundGrey1',
  borderRadius: '10px',
  WebkitBoxShadow: '0px 2px 8px 0px rgba(0,0,0,0.75)',
  MozBoxShadow: '0px 2px 8px 0px rgba(0,0,0,0.75)',
  boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.75)',
}

const contenTableModal = {
  height: 400,
  width: '100%',
  padding: '5px',
  paddingTop: '20px',
  bgcolor: 'backgroundGrey1',
  borderRadius: '0 0 10px 10px',
}

const btnNewStyles = {
  bgcolor: '#4CAF50',
  '&:hover': {
    bgcolor: '#388E3C',
  },
}

const btnAddActionStyles = {
  marginTop: '10px',
  marginBottom: '10px',
  ...btnNewStyles,
}

const btnNewTaskStyles = {
  marginBottom: '20px',
  ...btnNewStyles,
}

const accordionElementGenerationContainer = {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  marginY: '5px',
}

const contentInputs = { width: '100%', mb: '10px' }

const containerButtonStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
}

const sxAccordionStyles = {
  accordionContainerHover,
  accordionContainerDetails,
  accordionNameTaskContainer,
  accordionDescriptionTaskContainer,
  accordionSearchRoleContainer,
  accordionSummaryGenerationContainer,
  accordionSummaryElementContainer,
  accordionElementGeneration,
  accordionElementGenerationBtns,
  accordionElementGenerationContainer,
  accordionContentModalDocuments,
  contenTableModal,
  btnNewStyles,
  btnAddActionStyles,
  btnNewTaskStyles,
  contentInputs,
  containerButtonStyle,
}

export default sxAccordionStyles
