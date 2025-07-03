export const subSeriesColumns = [
  {
    dataIndex: 'numero',
    title: 'Código',
    minWidth: 120,
  },
  {
    dataIndex: 'nombre',
    title: 'Nombre Subserie',
    minWidth: 120,
  },
  {
    dataIndex: 'office',
    title: 'Dependencia',
    minWidth: 120,
    render: (_, data) => `${data?.dependenciaInfo?.name ?? ''}`,
  },
]
