const nodeHierarchyContainer = (isActive) => ({
  border: '1px solid',
  padding: '2px',
  borderRadius: '4px',
  color: 'white',
  width: '180px',
  height: '60px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  webkitBoxShadow: '0px 3px 5px 0px rgba(112,112,112,1)',
  mozBoxShadow: '0px 3px 5px 0px rgba(112,112,112,1)',
  boxShadow: '0px 3px 5px 0px rgba(112,112,112,1)',
  backgroundColor: isActive ? '#42A5F5' : '#808080',
  opacity: isActive ? '' : 0.6,
  borderColor: isActive ? '#42A5F5' : '#808080',
})

const nodeHierarchyContent = {
  width: '90%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
}

const containerNodeHierarchyLabel = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  p: '10px',
}

const toolTipBtnOutside = {
  width: '38px',
  height: '38px',
  color: '#FFF',
  mx: '5px',
  bgcolor: '#1a73e8',
  '&:hover': {
    bgcolor: '#1250A2',
  },
}
const hierarchyContainer = {
  height: 'calc(100vh - 170px)',
  padding: '20px',
  backgroundColor: 'backgroundGrey1',
  width: '100%',
  border: '1px solid #0000000f',
  borderRadius: '0 0 10px 10px',
}

const addNodeButtonContainer = {
  border: '1px solid #1E88E5',
  padding: '8px',
  backgroundColor: '#BDBDBD',
  borderRadius: '4px',
  minWidth: '50px',
  minHeight: '50px',
  display: 'flex',
  flexDirection: 'column',
}

const addNodeButton = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexGrow: 1,
  borderRadius: '50%',
  backgroundColor: '#C2CED6',
  maxWidth: '100%',
  border: '1px seolid #EDF4F9',
  webkitBoxShadow: '0px 0px 6px -4px rgba(0,0,0,0.75)',
  mozBoxShadow: '0px 0px 6px -4px rgba(0,0,0,0.75)',
  boxShadow: '0px 0px 6px -4px rgba(0,0,0,0.75)'
}

const customNodeHierarchyStyles = {
  nodeHierarchyContainer,
  nodeHierarchyContent,
  containerNodeHierarchyLabel,
  toolTipBtnOutside,
  hierarchyContainer,
  addNodeButtonContainer,
  addNodeButton
}

export default customNodeHierarchyStyles
