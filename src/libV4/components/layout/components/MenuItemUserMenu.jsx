import { ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material'
import { AccessControl } from '../../AccessControl'

const MenuItemUserMenu = ({ item }) => {
  return (
    <AccessControl privilege={item.privilege ?? ''}>
      <MenuItem
        title={item.label}
        sx={{ height: '50px' }}
        onClick={item.onClick}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText>
          <Typography>{item.label}</Typography>
        </ListItemText>
      </MenuItem>
    </AccessControl>
  )
}

export default MenuItemUserMenu
