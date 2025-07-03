import { ClassicIconButton, formatToLocaleDate } from '@/lib'
import { Assignment, DoDisturb } from '@mui/icons-material'

export const columnsCurrentDocuments = ({
  setPreviewer,
  hasPrivToCancel,
  modalCancelDoc,
  setCancelDoc,
}) => {
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
      minWidth: hasPrivToCancel ? 94 : 40,
      resizable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const idRow = params?.row?.id
        return (
          <>
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
            {hasPrivToCancel && (
              <ClassicIconButton
                onClick={() => {
                  modalCancelDoc.handleShow() // Llama a la función handleShow
                  setCancelDoc((prev) => ({ ...prev, id: idRow })) // Actualiza el estado con el idRow
                }}
                title={'Anular'}
              >
                <DoDisturb />
              </ClassicIconButton>
            )}
          </>
        )
      },
    },
  ]
}
