import { ClassicIconButton } from '@/libV4'
import { Delete, Edit, Visibility } from '@mui/icons-material'

export const columnsFamily = [
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 100,
  },
  {
    field: 'apellidos',
    headerName: 'Apellidos',
    width: 100,
  },
  {
    field: 'parentesco',
    headerName: 'Parentesco',
    width: 100,
  },
  {
    field: 'tipo_identificacion',
    headerName: 'Tipo de identificación',
    width: 100,
  },
  {
    field: 'numero',
    headerName: 'Número',
    width: 100,
  },
  {
    field: 'dependiente_economico',
    headerName: 'Dependiente económico',
    width: 100,
  },
  {
    field: 'fecha_nacimiento',
    headerName: 'Fecha de nacimiento',
    width: 100,
  },
  {
    field: 'options',
    headerName: '',
    sortable: false,
    disableColumnMenu: true,
    width: 100,
    renderCell: () => {
      return (
        <div className='flex flex-row justify-center'>
          <ClassicIconButton onClick={() => {}}>
            <Edit />
          </ClassicIconButton>
          <ClassicIconButton onClick={() => {}}>
            <Visibility />
          </ClassicIconButton>
          <ClassicIconButton onClick={() => {}}>
            <Delete />
          </ClassicIconButton>
        </div>
      )
    },
    resizable: false,
  },
]
