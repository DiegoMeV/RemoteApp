import { AttachFile, Link } from '@mui/icons-material'
import { Menu, MenuItem, Typography } from '@mui/material'

const MenuChoose = ({ anchorEl, handleClose, append }) => {
  const open = Boolean(anchorEl)

  const handleAppend = (isUrl) => {
    const idFile = crypto.randomUUID()
    const newFile = { id: idFile, url: '', file: '', isUrl }
    append(newFile)
    handleClose()
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <MenuItem
        sx={{ width: '100%', display: 'flex', gap: '10px' }}
        onClick={() => handleAppend(false)}
      >
        <AttachFile />
        <Typography>Agregar archivo</Typography>
      </MenuItem>
      <MenuItem
        sx={{ width: '100%', display: 'flex', gap: '10px' }}
        onClick={() => handleAppend(true)}
      >
        <Link />
        <Typography>Agregar url</Typography>
      </MenuItem>
    </Menu>
  )
}

export default MenuChoose
