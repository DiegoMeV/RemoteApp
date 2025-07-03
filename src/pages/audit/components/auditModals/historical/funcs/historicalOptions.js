import { ClassicIconButton, formatToLocaleDate } from '@/lib'
import { Assignment, Edit, InfoOutlined } from '@mui/icons-material'

export const getColums = (setBoxType, setDocs, hasSomePrivilege, handleOpenManagement) => {
  const openInfoDocs = () => {
    setBoxType('infoDocs')
  }
  const openInfoActivity = () => {
    setBoxType('infoActivity')
  }
  return [
    {
      field: 'stageName',
      headerName: 'Etapa',
      width: 200,
    },
    {
      field: 'Task',
      headerName: 'Actividad',
      width: 200,
      valueGetter: (params) => `${params?.row?.Task?.name ?? ''}`,
    },
    {
      field: 'assignedToUserData',
      headerName: 'Responsable',
      width: 200,
      valueGetter: (params) =>
        params?.row?.assignedToUserData
          ? `${`${params?.row?.assignedToUserData?.firstName ?? ''} ${
              params?.row?.assignedToUserData?.lastName ?? ''
            }`}`
          : `${params?.row?.userOfficeData?.depencyName ?? ''}`,
    },
    {
      field: 'notifiedAt',
      headerName: 'Fecha de notificación',
      width: 200,
      valueFormatter: (params) => {
        return formatToLocaleDate(params?.value)
      },
    },
    {
      field: 'completedAt',
      headerName: 'Fecha de gestión',
      width: 200,
      valueFormatter: (params) => {
        return formatToLocaleDate(params.value)
      },
    },
    {
      field: 'options',
      headerName: '',
      minWidth: 130,
      renderCell: (params) => {
        const row = params.row
        const idActivity = row?.id
        const idProcess = row?.idProcess

        return (
          <>
            <ClassicIconButton
              onClick={() => handleOpenManagement({ idProcess, idActivity })}
              title='Editar gestion'
            >
              <Edit />
            </ClassicIconButton>
            <ClassicIconButton
              title='Ver documentos'
              onClick={() => {
                openInfoDocs()
                setDocs(params.row)
              }}
            >
              <Assignment />
            </ClassicIconButton>
            <ClassicIconButton
              title='Información de la actividad'
              onClick={() => {
                openInfoActivity()
                setDocs(params.row)
              }}
            >
              <InfoOutlined />
            </ClassicIconButton>
          </>
        )
      },
    },
  ]
}

export const getParams = (activity, info, index) => {
  const isCompleted = activity?.status === 'COMPLETED'
  const isLastActivity = info?.length === index + 1
  return {
    isCompleted,
    isLastActivity,
  }
}
