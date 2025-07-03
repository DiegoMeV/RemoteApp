import { Badge, Grid, ListItem, ListItemIcon, ListItemText } from '@mui/material'

const PendingItem = ({ Icon, text, pendingNumber }) => {
  return (
    <Grid
      item
      xs={12}
      sm={5}
      container
      border='1px solid #ccc'
      borderRadius='10px'
      boxShadow='0px 4px 4px -2px rgba(0, 0, 0, 0.2)'
    >
      <ListItem sx={{ padding: '8px' }}>
        <ListItemIcon sx={{ minWidth: '30px', marginRight: '2px' }}>
          <Icon fontSize='small' />
        </ListItemIcon>
        <ListItemText
          primary={text}
          primaryTypographyProps={{ variant: 'body2' }}
          sx={{ marginRight: '8px' }}
        />
        <ListItemIcon sx={{ minWidth: '30px' }}>
          <Badge
            badgeContent={pendingNumber}
            color='primary'
            max={9999}
            showZero
            sx={{ marginLeft: '8px' }}
          />
        </ListItemIcon>
      </ListItem>
    </Grid>
  )
}

export default PendingItem
