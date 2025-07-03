import { ClassicIconButton, formatToLocaleDate } from '@/lib'
import ButtonVisualizerDocument from '../ButtonVisualizerDocument'
import { Close } from '@mui/icons-material'

const documentsColumns = (openCancelModal) => {
  return [
    {
      field: 'task',
      headerName: 'Actividad',
      width: 350,
      valueGetter: (params) => {
        return `${params?.row?.TaskRel?.name ?? ''}`
      },
    },
    {
      field: 'name',
      headerName: 'Documentos',
      width: 350,
      valueGetter: (params) => {
        return `${params?.row?.ActionItemRel?.name ?? ''}`
      },
    },
    {
      field: 'taskData',
      headerName: 'Fecha de creación',
      width: 200,
      valueGetter: (params) => {
        return `${formatToLocaleDate(params?.row?.ActionItemRel?.createdAt ?? '')}`
      },
    },
    {
      field: 'documentData',
      headerName: 'Estado',
      width: 150,
      valueGetter: (params) => {
        return `${params?.row?.documentToBeHandledData?.status ?? ''}`
      },
    },
    {
      field: 'options',
      headerName: '',
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      renderCell: (params) => {
        const idDocument = params?.row?.documentToBeHandledData?.id
        return (
          <>
            <ClassicIconButton
              color='error'
              onClick={() => openCancelModal(params)}
              title='Rechazar'
            >
              <Close />
            </ClassicIconButton>
            <ButtonVisualizerDocument idDocument={idDocument} />
          </>
        )
      },
    },
  ]
}

export default documentsColumns
