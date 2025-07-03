import { ClassicIconButton } from '@/lib'
import { MoreVert } from '@mui/icons-material'
import { Box, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material'
import { useState } from 'react'

const TreasuryOptionMenu = ({ treasuryOptions }) => {
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
          <ClassicIconButton
            onClick={handleClick}
            title='Más opciones'
          >
            <MoreVert />
          </ClassicIconButton>
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
          {treasuryOptions?.map((item, index) => {
            return (
              <MenuItem
                key={index}
                sx={item?.sx}
                onClick={() => {
                  item?.onClick?.()
                  handleClose()
                }}
              >
                <ListItemText>{item?.text}</ListItemText>
              </MenuItem>
            )
          })}
        </Menu>
      </Box>
    </Box>
  )
}

export default TreasuryOptionMenu
