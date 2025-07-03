import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { handleCloseMenu } from '../hooks'

const MenuTask = ({
  anchorEl,
  openMenu,
  setAnchorEl,
  task,
  showMenu,
  menuOptions,
  horizontalPosition
}) => {
  return (
    <Menu
      anchorEl={anchorEl[showMenu]}
      open={openMenu[showMenu]}
      onClose={(event) => handleCloseMenu(event, showMenu, setAnchorEl, anchorEl)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: horizontalPosition,
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: horizontalPosition,
      }}
    >
      {menuOptions.map((option, index) => {
        return (
          <MenuItem
            key={index}
            disabled={option.disabled}
            onClick={(event) => option.handleClick(event, task)}
          >
            <ListItemIcon>
              {option.icon}
            </ListItemIcon>
            <ListItemText>{option.label}</ListItemText>
          </MenuItem>
        )
      })}
    </Menu>
  )
}

export default MenuTask
