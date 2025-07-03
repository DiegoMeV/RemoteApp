import { ClassicIconButton } from '@/libV4'
import { Delete, Edit, Upload, Visibility } from '@mui/icons-material'

export const columnsAcademicFormation = [
  {
    field: 'institucion_educativa',
    headerName: 'Institución educativa',
    width: 100,
  },
  {
    field: 'nivel_academico',
    headerName: 'Nivel académico',
    width: 100,
  },
  {
    field: 'titulo_obtenido',
    headerName: 'Titulo obtenido',
    width: 100,
  },
  {
    field: 'estado_estudio',
    headerName: 'Estado del estudio',
    width: 100,
  },
  {
    field: 'fecha_finalizacion',
    headerName: 'Fecha de finalización',
    width: 100,
  },
  {
    field: 'pais',
    headerName: 'País',
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
