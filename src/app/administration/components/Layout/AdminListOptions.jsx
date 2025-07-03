import { AccessControl, BasicListItem } from '@/libV4'
import { Divider, lighten, ListSubheader } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { adminListOptions } from '../../hooks'

const AdminListOptions = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const bgColorPrimary = (theme) => lighten(theme.palette.primary.main, 0.8)

  return (
    <div className='flex flex-col gap-1'>
      <ListSubheader
        sx={{
          backgroundColor: 'backgroundWhite1',
        }}
      >
        Administración
      </ListSubheader>
      <Divider variant='middle' />
      {adminListOptions?.map((option) => (
        <AccessControl
          key={option.id}
          privilege={option.privilege}
        >
          <BasicListItem
            key={option.id}
            icon={option.icon}
            label={option.label}
            onClick={() => navigate(option.path)}
            sx={{
              backgroundColor: pathname.includes(option.path) ? bgColorPrimary : 'transparent',
            }}
          />
        </AccessControl>
      ))}
    </div>
  )
}

export default AdminListOptions
