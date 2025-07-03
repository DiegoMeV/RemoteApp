import { ClassicIconButton } from '@/lib'
import { Edit, ViewHeadline } from '@mui/icons-material'
import { Box } from '@mui/material'

const EditOptionTeam = ({ params, editTeam, viewMembers, editAccess, viewAccess }) => {
  return (
    <Box
      display='grid'
      gridTemplateColumns='1fr 1fr 1fr'
      width='100%'
    >
      {editAccess && (
        <ClassicIconButton
          color='secondary'
          onClick={() => editTeam(params?.row?.id)}
          title='Editar'
        >
          <Edit />
        </ClassicIconButton>
      )}
      {viewAccess && (
        <ClassicIconButton
          color='secondary'
          onClick={() => viewMembers(params?.row?.id)}
          title=' Ver miembros'
        >
          <ViewHeadline />
        </ClassicIconButton>
      )}
    </Box>
  )
}

export default EditOptionTeam
