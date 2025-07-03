import { IconButton, Tooltip } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { TooltipBtnSidebarStyles } from '../styles'

const TooltipBtnSidebar = ({ title, IconComponent, handleClick, style }) => {
  const dark = useStoreState((state) => state.darkTheme.dark)
  return (
    <Tooltip
      title={title}
      placement='left'
      arrow
    >
      <IconButton
        onClick={handleClick}
        sx={TooltipBtnSidebarStyles.iconButtonSidebar(style, dark)}
      >
        {<IconComponent sx={TooltipBtnSidebarStyles.iconComponentSidebar(dark)} />}
      </IconButton>
    </Tooltip>
  )
}

export default TooltipBtnSidebar
