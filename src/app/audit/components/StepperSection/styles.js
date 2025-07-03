export const connectorStyles = {
  my: 4,
  '& .MuiStepConnector-line': {
    borderTopWidth: 3,
    marginLeft: '10px',
    marginRight: '10px',
  },
  '& .MuiStepConnector-alternativeLabel': {
    top: 22,
  },
  '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
    borderColor: 'primary.main',
  },
  '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
    borderColor: 'primary.main',
  },
}
