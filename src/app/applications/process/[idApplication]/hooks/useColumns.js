import { ClassicIconButton } from '@/lib'
import { Air, Edit } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const useColumns = (data) => {
  const navigate = useNavigate()
  const columns = {
    field: 'name',
    headerName: 'Nombre',
    width: 200,
  }

  const options = {
    field: 'options',
    headerName: '',
    width: 120,
    renderCell: (params) => {
      return (
        <Box
          alignItems='center'
          justifyContent='center'
          display='flex'
          flexDirection='row'
        >
          <ClassicIconButton
            onClick={() =>
              navigate(
                `/applications/process/editProcessTypeGroups/${params?.row?.idApplication}/${params?.row?.id}`
              )
            }
            title='Editar grupo'
            placement='bottom'
            color={'secondary'}
          >
            <Edit />
          </ClassicIconButton>
          <ClassicIconButton
            onClick={() =>
              navigate(
                `/applications/process/tiposDeProcesos/${params?.id}?idApplication=${params?.row?.idApplication}`
              )
            }
            title='Tipos de proceso'
            placement='bottom'
            color={'secondary'}
          >
            <Air />
          </ClassicIconButton>
        </Box>
      )
    },
  }
  return data ? [columns, options] : []
}

export default useColumns
