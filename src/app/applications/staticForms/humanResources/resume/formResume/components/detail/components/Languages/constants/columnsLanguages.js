import { ClassicIconButton } from '@/libV4'
import { Delete, Edit, Upload, Visibility } from '@mui/icons-material'

export const columnsLanguages = [
  {
    field: 'idioma',
    headerName: 'Idioma',
    width: 100,
  },
  {
    field: 'escribe',
    headerName: 'Escribe',
    width: 100,
  },
  {
    field: 'Habla',
    headerName: 'habla',
    width: 100,
  },
  {
    field: 'lee',
    headerName: 'Lee',
    width: 100,
  },
  {
    field: 'certificado_cargado',
    headerName: 'Certificado cargado',
    width: 100,
  },
  {
    field: 'verificado',
    headerName: 'Verificado',
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
            <Upload />
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
