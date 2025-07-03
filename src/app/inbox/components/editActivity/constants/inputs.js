export const inputsEditActivity = ({ pendingRequest }) => {
  return [
    {
      label: 'Usuario asignado',
      name: 'assignedTo',
      sm: 6,
      space: 6,
      required: true,
      type: 'autocompleteRequest',
      disabled: pendingRequest,
      requestProps: {
        isCompanyRequest: true,
        baseKey: 'urlUsers',
        url: `users?isActive=true&`,
        requestOnInput: true,
      },
      autocompleteProps: {
        getOptionLabel: (option) => `${option?.firstName ?? ''} ${option?.lastName ?? ''}`,
        loadingValue: pendingRequest,
      },
      vlProps: {
        usePagination: true,
        hasQuerySearch: true,
        paginationType: 'cursor',
        columns: [
          {
            field: 'firstName',
            headerName: 'Nombre',
            width: 200,
            valueGetter: (params) => {
              return `${params?.row?.firstName ?? ''}`
            },
          },
          {
            field: 'lastName',
            headerName: 'Apellido',
            width: 200,
            valueGetter: (params) => {
              return `${params?.row?.lastName ?? ''}`
            },
          },
        ],
        title: 'Usuarios',
        queryRequest: {
          querySearch: 'querySearch',
        },
      },
    },
    {
      label: 'Estado',
      name: 'status',
      required: true,
      type: 'select',
      options: [
        { label: 'Notificado', value: 'NOTIFIED' },
        { label: 'En progreso', value: 'PROGRESS' },
        { label: 'Completado', value: 'COMPLETED' },
      ],
      sm: 6,
      space: 6,
    },
    {
      label: 'Comentario',
      name: 'comment',
      required: true,
      type: 'multiline',
      sm: 12,
      space: 12,
      minRows: 3,
    },
  ]
}
