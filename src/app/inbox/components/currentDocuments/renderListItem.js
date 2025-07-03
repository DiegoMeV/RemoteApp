import { ListItem, ListItemText } from '@mui/material'

export const renderListItem = (label, value) => (
  <ListItem
    sx={{
      boxSizing: 'border-box',
      display: { xs: 'block', sm: 'grid' },
      gridTemplateColumns: '200px 1fr',
      borderBottom: '1px solid #0000001f',
    }}
  >
    <ListItemText>{label}:</ListItemText>
    <ListItemText>{value}</ListItemText>
  </ListItem>
)
