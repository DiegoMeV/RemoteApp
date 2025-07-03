import { useState } from 'react'
import { Box, Button, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material'
import { GridMoreVertIcon } from '@mui/x-data-grid'
import { AccessControl } from '@/libV4'

const RowMenu = ({ rowOptions }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box
      display='flex'
      height='100%'
      justifyContent='center'
    >
      <Box display='flex'>
        <Tooltip
          title='Más Opciones'
          arrow
        >
          <Button
            id='basic-button'
            onClick={handleClick}
            sx={{ minWidth: 50 }}
          >
            <GridMoreVertIcon />
          </Button>
        </Tooltip>

        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {rowOptions?.map((item, index) => {
            const renderOptions = item?.render ?? true
            return (
              <AccessControl
                key={index}
                privilege={item?.privilege ?? ''}
              >
                {renderOptions && (
                  <MenuItem
                    key={index}
                    sx={item?.sx}
                    onClick={() => {
                      item?.onClick?.()
                      handleClose()
                    }}
                  >
                    <ListItemIcon>{item?.icon}</ListItemIcon>
                    <ListItemText>{item?.text}</ListItemText>
                  </MenuItem>
                )}
              </AccessControl>
            )
          })}
        </Menu>
      </Box>
    </Box>
  )
}

export default RowMenu
