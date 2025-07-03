import { Badge, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

const ListItemMenu = ({ children, onClick, icon, info, sx }) => {
  return (
    <ListItemButton
      onClick={onClick}
      sx={sx}
    >
      <ListItemIcon>
        {icon}
        <Badge
          badgeContent={info.count}
          color='primary'
          sx={{ marginLeft: '10px' }}
        />
      </ListItemIcon>
      <ListItemText primary={info.name} />
      {children}
    </ListItemButton>
  )
}
export default ListItemMenu
