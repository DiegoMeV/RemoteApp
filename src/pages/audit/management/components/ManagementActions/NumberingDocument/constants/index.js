export const subseriesColumns = [
  {
    field: 'numero',
    headerName: 'Código',
    minWidth: 120,
  },
  {
    field: 'nombre',
    headerName: 'Nombre Subserie',
    minWidth: 120,
    valueGetter: (params) => `${params?.value ?? ''}`,
  },
  {
    field: 'office',
    headerName: 'Dependencia',
    minWidth: 120,
    valueGetter: (params) => `${params?.row?.dependenciaInfo?.name ?? ''}`,
  },
]
