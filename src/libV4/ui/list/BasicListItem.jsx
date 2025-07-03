import { AccessControl } from '@/libV4/components'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

const BasicListItem = ({ icon, label, privilege, children, ...listItemProps }) => {
  return privilege ? (
    <AccessControl
      key={label}
      privilege={privilege ?? ''}
    >
      <ListItemButton {...listItemProps}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        {label && <ListItemText>{label}</ListItemText>}
      </ListItemButton>
    </AccessControl>
  ) : (
    <ListItemButton {...listItemProps}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      {label && <ListItemText>{label}</ListItemText>}
      {children}
    </ListItemButton>
  )
}

export default BasicListItem
