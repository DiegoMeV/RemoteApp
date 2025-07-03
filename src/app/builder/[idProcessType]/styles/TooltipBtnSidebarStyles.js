const iconButtonSidebar = (style, dark) => {
  return {
    ...style,
    border: dark === 'dark' ? 'solid 1px #757575' : 'solid 2px rgba(0, 0, 0, 0.12)',
    position: 'absolute',
    backgroundColor: dark === 'dark' ? '#121212' : '#FFFFFF',
    '&:hover': {
      backgroundColor: dark === 'dark' ? '#272727' : '#EDEDED',
    },
  }
}

const closeIconBtn = (dark) => {
  return {
    minWidth: '25px',
    color: dark === 'dark' ? '' : '#1976d2',
    minHeight: '25px',
  }
}

const iconComponentSidebar = (dark) => {
  return {
    minWidth: '25px',
    minHeight: '25px',
    color: dark === 'dark' ? '' : '#1976d2',
    borderRadius: '50%',
  }
}
const TooltipBtnSidebarStyles = {
  iconButtonSidebar,
  iconComponentSidebar,
  closeIconBtn,
}

export default TooltipBtnSidebarStyles
