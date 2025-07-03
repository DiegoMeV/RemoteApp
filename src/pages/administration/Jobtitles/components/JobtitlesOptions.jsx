import { Edit, Menu } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const JobtitlesOptions = ({ data, handleOpenEdition, handleEditRoles }) => {
  return (
    <div className='flex flex-row'>
      <IconButton
        title='Editar'
        onClick={() => {
          handleOpenEdition?.(data)
        }}
      >
        <Edit />
      </IconButton>
      <IconButton
        title='Assignar roles'
        onClick={() => {
          handleEditRoles?.(data)
        }}
      >
        <Menu />
      </IconButton>
    </div>
  )
}

export default JobtitlesOptions
