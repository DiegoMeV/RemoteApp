export const columnsLovSigners = () => [
  {
    field: 'name',
    headerName: 'Nombre',
    flex: 1,
    renderCell: (params) => `${params?.row?.firstName} ${params?.row?.lastName}`,
  },
  {
    field: 'jobTitle',
    headerName: 'Cargo',
    flex: 1,
    renderCell: (params) => {
      return params?.row?.jobTitles?.name ?? ''
    },
  },
  {
    field: 'dependency',
    headerName: 'Dependencia',
    flex: 1,
    renderCell: (params) => {
      return params?.row?.jobTitles?.depencyName ?? ''
    },
  },
  {
    field: 'email',
    headerName: 'Correo',
    flex: 1,
  },
]
