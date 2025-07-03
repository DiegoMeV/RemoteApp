import { AddCircleOutline, Edit, GroupOutlined } from '@mui/icons-material'
import { ClassicIconButton } from '@/lib'

const RolesOptions = ({
  data,
  handleOpenEdition,
  handleListPrivileges,
  handleOpenUsersByRole,
  editAccess,
  listPrivAccess,
}) => {
  return (
    <div className='flex'>
      {editAccess && (
        <ClassicIconButton
          color='secondary'
          title='Editar'
          onClick={() => {
            handleOpenEdition?.(data)
          }}
        >
          <Edit />
        </ClassicIconButton>
      )}

      <ClassicIconButton
        color='secondary'
        title='Ver usuarios'
        onClick={() => {
          handleOpenUsersByRole(data)
        }}
      >
        <GroupOutlined />
      </ClassicIconButton>
      {listPrivAccess && data?.typeRole !== 'OPERATIONAL' && (
        <ClassicIconButton
          color='secondary'
          title='Asignar privilegios'
          onClick={() => {
            handleListPrivileges(data)
          }}
        >
          <AddCircleOutline />
        </ClassicIconButton>
      )}
    </div>
  )
}

export default RolesOptions
