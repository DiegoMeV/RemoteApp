import { ClassicIconButton } from '@/libV4'
import { Delete, Edit, Visibility } from '@mui/icons-material'

export const columnsPublications = [
  {
    field: 'nombre_articulo',
    headerName: 'Nombre del articulo o publicación',
    width: 100,
  },
  {
    field: 'tipo_articulo',
    headerName: 'Tipo de articulo',
    width: 100,
  },
  {
    field: 'nombre_libro',
    headerName: 'Nombre del libro o revista',
    width: 100,
  },
  {
    field: 'libro_resultado_investigacion',
    headerName: 'Libro resultado de la investigación',
    width: 100,
  },
  {
    field: 'fecha_publicacion',
    headerName: 'Fecha de publicación',
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
