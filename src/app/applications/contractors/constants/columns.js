export const columnsProvinces = [
  { field: 'nombre', headerName: 'Nombre', width: 200 },
  {
    field: 'departamentoInfo',
    headerName: 'Departamento',
    width: 200,
    valueGetter: (params) => {
      return `${params.row?.departamentoInfo?.nombre ?? ''}`
    },
  },
]
