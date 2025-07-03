import { AccessControl } from '@/libV4'
import MenuItem from './MenuItem'
import { Box } from '@mui/material'

const MenuMap = ({ items, handleClose, getMenuApplications }) => {
  return (
    <Box>
      {items.map((item) => (
        <AccessControl
          key={item.id}
          privilege={item.privilege ?? ''}
        >
          <MenuItem
            item={item}
            handleClose={handleClose}
            getMenuApplications={getMenuApplications}
          />
        </AccessControl>
      ))}
    </Box>
  )
}

export default MenuMap
