import { AccessControl } from '@/libV4'
import { ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material'

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
