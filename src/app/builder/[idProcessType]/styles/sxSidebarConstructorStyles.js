const containerSidebar = {
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 138px)',
  paddingY: '40px',
  paddingX: '30px',
  overflow: 'auto',
}
const formStageContainer = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'start',
  gap: '10px',
}

const formStageContainerButton = {
  pl: '10px',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
}

const btnTasksContainerSidebar = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'start',
  marginY: '15px',
}

const tasksContainer = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
}

const sxSidebarConstructorStyles = { tasksContainer, containerSidebar, formStageContainer, formStageContainerButton, btnTasksContainerSidebar }

export default sxSidebarConstructorStyles
