import { ClassicIconButton, formatToLocaleDate } from '@/lib'
import { Assignment } from '@mui/icons-material'

export const columnsCurrentDocuments = ({ setPreviewer }) => {
  return [
    {
      field: 'nombreMostrar',
      headerName: 'Nombre',
      minWidth: 200,
      valueGetter: (params) => {
        return `${params?.row?.nombreMostrar ?? params?.row?.nombre ?? ''}`
      },
    },
    {
      field: 'nombre',
      headerName: 'Nombre archivo',
      minWidth: 200,
      valueGetter: (params) => {
        return `${params?.row?.nombre ?? ''}`
      },
    },
    {
      field: 'estado',
      headerName: 'Estado',
      minWidth: 150,
      valueGetter: (params) => `${params?.row?.estado}`,
    },
    {
      field: 'fechaCreacion',
      headerName: 'Fecha de generación',
      width: 200,
      valueGetter: (params) => `${formatToLocaleDate(params.value)}`,
    },
    {
      field: 'fechaActualizacion',
      headerName: 'Fecha de actualización',
      width: 200,
      valueGetter: (params) => `${formatToLocaleDate(params.value)}`,
    },
    {
      field: 'options',
      headerName: '',
      width: 60,
      resizable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const idRow = params?.row?.id
        return (
          <ClassicIconButton
            onClick={async () => {
              await setPreviewer({
                open: true,
                idDocument: idRow,
                loadingPreviewer: true,
              })
            }}
            title={'Previsualizar'}
          >
            <Assignment />
          </ClassicIconButton>
        )
      },
    },
  ]
}
