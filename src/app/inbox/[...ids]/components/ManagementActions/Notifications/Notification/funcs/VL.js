import { ClassicIconButton } from '@/lib'
import { Assignment } from '@mui/icons-material'

export const columnsToNotificationVL = ({ setPreviewer }) => {
  return [
    {
      field: 'nombreMostrar',
      headerName: 'Nombre',
      minWidth: 400,
      valueGetter: (params) => {
        return `${
          !!params?.row?.nombreMostrar && params?.row?.nombreMostrar !== ''
            ? params?.row?.nombreMostrar
            : params?.row?.nombre ?? ''
        }`
      },
    },
    {
      field: 'prev',
      headerName: '',
      width: 60,
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
