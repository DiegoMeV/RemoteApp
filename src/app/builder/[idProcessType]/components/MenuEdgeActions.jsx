import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'

import { BackdropLoading } from '@/lib'
import { useMenuEdge } from '../hooks'

const MenuEdgeActions = ({ open = false, edgeMenuActions = null } = {}) => {

  const [state, stateFunction] = useMenuEdge()
  const { menuListOptions, loading } = state
  const { setEgdeMenuClose } = stateFunction

  return (
    <Menu
      id='more-actions-edge-menu'
      anchorEl={document.getElementById(edgeMenuActions)}
      open={open}
      onClose={setEgdeMenuClose}
      MenuListProps={{
        'aria-labelledby': 'more-vert-button-edge',
      }}
    >
      {loading && <BackdropLoading loading={loading} />}
      {menuListOptions.map((item, index) => {
        return (
          <MenuItem
            key={index}
            onClick={item.handleEvent}
          >
            <ListItemIcon sx={{ minWidth: '34px' }}>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        )
      })}
    </Menu>
  )
}

export default MenuEdgeActions
