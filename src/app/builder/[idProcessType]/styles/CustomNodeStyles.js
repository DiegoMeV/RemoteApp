// import { stringToObject } from '@/lib'

// const themeApp = process.env.THEME_APPLICATION ? stringToObject(process.env.THEME_APPLICATION) : {}
const customNodeContainer = {
  border: '1px solid #1E88E5',
  padding: '2px',
  backgroundColor: '#BDBDBD',
  borderRadius: '4px',
  color: 'white',
  minWidth: '150px',
  maxWidth: '180px',
  minHeight: '60px',
  maxHeight: '100px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
}

const containerCustomBtn = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexGrow: 1,
  overflow: 'auto',
  gap: '5px',
  borderRadius: '5px',
  backgroundColor: '#5A6B78',
  maxWidth: '100%',
  wordBreak: 'break-word',
}

const toolTipBtn = {
  width: '38px',
  height: '38px',
  color: '#FFF',
  mx: '5px',
  // bgcolor: themeApp?.primary || '#1a73e8',
  '&:hover': {
    bgcolor: '#1250A2',
  },
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
  boxShadow: '0px 0px 6px -4px rgba(0,0,0,0.75)',
}

const moreVertIconStyles = {
  fontSize: '1rem',
  fill: '#0984e3',
  position: 'absolute',
  top: '1px',
  left: '1px',
}

const titleNodeStage = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  p: '10px',
}

const customNodeStyles = {
  customNodeContainer,
  containerCustomBtn,
  toolTipBtn,
  addNodeButtonContainer,
  addNodeButton,
  moreVertIconStyles,
  titleNodeStage,
}

export default customNodeStyles
