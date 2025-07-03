import { AccessControl } from '@/libV4/components'
import { Button, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'

const CustomMenu = ({ buttonProps = {}, items = [], menuProps = {} }) => {
  const { label, icon, type, onClick = () => {}, ...moreProps } = buttonProps

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    onClick(event)
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      {type === 'button' && (
        <Button
          variant='contained'
          {...moreProps}
          onClick={handleClick}
        >
          {label ?? ''}
        </Button>
      )}
      {type === 'IconButton' && (
        <IconButton
          {...moreProps}
          onClick={handleClick}
        >
          {icon ?? <></>}
        </IconButton>
      )}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        {...menuProps}
      >
        {items?.map((item, index) => {
          return item?.privilege ? (
            <AccessControl
              privilege={item?.privilege}
              key={index}
            >
              <MenuItem>
                {item?.icon && <ListItemIcon>{item?.icon}</ListItemIcon>}
                <ListItemText>{item?.label ?? ''}</ListItemText>
              </MenuItem>
            </AccessControl>
          ) : (
            <MenuItem key={index}>
              {item?.icon && <ListItemIcon>{item?.icon}</ListItemIcon>}
              <ListItemText>{item?.label ?? ''}</ListItemText>
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}

export default CustomMenu
