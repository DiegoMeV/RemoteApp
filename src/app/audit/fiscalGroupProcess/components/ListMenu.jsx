import { ClassicIconButton } from '@/lib'
import { Divider, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ListMenu = ({ idGroup, icon, text, icon2, icon3 }) => {
  const navigate = useNavigate()
  return (
    <ListItem>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{text}</ListItemText>
      <ClassicIconButton
        title='Editar grupo'
        placement='bottom'
        color={'secondary'}
        onClick={() => navigate(`/audit/fiscalGroupProcess/edit/${idGroup}`)}
      >
        {icon2}
      </ClassicIconButton>
      <ClassicIconButton
        onClick={() => navigate(`/audit/fiscalGroupProcess/${idGroup}`)}
        title='Tipos de proceso'
        placement='bottom'
        color={'secondary'}
      >
        {icon3}
      </ClassicIconButton>
      <Divider />
    </ListItem>
  )
}
export default ListMenu
