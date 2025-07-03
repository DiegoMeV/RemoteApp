export const columnsValueListSigners = [
  {
    field: 'name',
    headerName: 'Nombre',
    width: 300,
    valueGetter: (params) => {
      return `${(params?.row?.firstName ?? '') + ' ' + (params?.row?.lastName ?? '')}`
    },
  },
  {
    field: 'jobTitle',
    headerName: 'Cargo',
    width: 300,
    valueGetter: (params) => {
      return `${params.row.jobTitles?.name}`
    },
  },
  {
    field: 'depency',
    headerName: 'Dependencia',
    width: 300,
    valueGetter: (params) => `${params.row.jobTitles?.depencyName ?? ''}`,
  },
]
