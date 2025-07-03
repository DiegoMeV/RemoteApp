import { ClassicIconButton, formatToLocaleDate } from '@/lib'
import { Assignment, InfoOutlined } from '@mui/icons-material'
import { MoreOptions } from '../components'

export const getColums = (setBoxType, setDocs, setIdActivity, hasSomePrivilege, openModals) => {
  const openInfoDocs = () => {
    setBoxType('infoDocs')
  }
  const openInfoActivity = () => {
    setBoxType('infoActivity')
  }

  const statusOptions = {
    NOTIFIED: 'Notificado',
    PROGRESS: 'En proceso',
    COMPLETED: 'Completado',
    CANCELLED: 'Cancelado',
    SUSPENDED: 'Suspendido',
    INREVIEW: 'En revisión',
    REVIEWED: 'Revisado',
    PARTIALCOMPLETED: 'Parcialmente completado',
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
      field: 'status',
      headerName: 'Estado de la actividad',
      width: 200,
      valueGetter: (params) => {
        return statusOptions[params?.row?.status] ?? ''
      },
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
      minWidth: hasSomePrivilege ? 130 : 90,
      renderCell: (params) => {
        return (
          <>
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
            {hasSomePrivilege && (
              <MoreOptions
                infoRow={params.row}
                setIdActivity={setIdActivity}
                openModals={openModals}
              />
            )}
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

export const inputsNotification = ({ idProcessType, idTask }) => {
  return [
    {
      label: 'Nro Radicado',
      name: 'identifier',
      required: false,
      type: 'text',
      className: 'col-span-6',
      InputProps: {
        readOnly: true,
        sx: {
          fontWeight: 'bold',
          fontSize: '16px',
        },
      },
    },
    {
      label: 'Tipo de proceso',
      name: 'processType',
      required: false,
      type: 'text',
      className: 'col-span-6',
      InputProps: {
        readOnly: true,
        sx: {
          fontWeight: 'bold',
          fontSize: '16px',
        },
      },
    },
    {
      name: 'idTask',
      required: true,
      label: 'Etapa - Actividad',
      type: 'autocompleteRequest',
      queryRequest: {
        querySearch: 'querySearch',
      },
      requestprops: {
        baseKey: 'urlProcess',
        url: `/process-types/${idProcessType}/util/all-activities`,
        isPaginated: false,
        enabled: !!idProcessType,
      },
      vlprops: {
        shouldClose: true,
        columns: [
          {
            dataIndex: 'parentTask',
            title: 'Etapa',
            render: (_, data) => data?.ParentTask?.name ?? '',
          },
          {
            dataIndex: 'task',
            title: 'Actividad',
            render: (_, data) => data?.name ?? '',
          },
        ],
      },
      getOptionLabel: (option) => {
        return `${option?.ParentTask?.name ?? ''}${option?.name ? ` - ${option?.name}` : ''}`
      },
      className: 'col-span-12',
    },
    {
      label: 'Usuario asignado',
      name: 'assignedTo',
      className: 'col-span-12',
      required: true,
      disabled: !idTask?.idRole,
      type: 'autocompleteRequest',
      queryRequest: {
        querySearch: 'querySearch',
        additionalQuery: `&isActive=true&idRole=${idTask?.idRole}`,
      },
      requestprops: {
        isCompanyRequest: true,
        baseKey: 'urlUsers',
        url: `/users`,
        requestOnInput: true,
        usePagination: true,
        enabled: !!idTask?.idRole,
      },
      autocompleteprops: {
        getOptionLabel: (option) => `${option?.firstName ?? ''} ${option?.lastName ?? ''}`,
      },
      vlprops: {
        shouldClose: true,
        hasQuerySearch: true,
        paginationType: 'cursor',
        columns: [
          {
            dataIndex: 'firstName',
            title: 'Nombre',
          },
          {
            dataIndex: 'lastName',
            title: 'Apellido',
          },
          {
            dataIndex: 'documentId',
            title: 'Identificación',
          },
        ],
      },
    },
  ]
}
