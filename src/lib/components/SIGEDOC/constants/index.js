export const columnsValueListUsers = [
  {
    field: 'name',
    headerName: 'Nombre',
    minWidth: 300,
    valueGetter: (params) => {
      return `${(params?.row?.firstName ?? '') + ' ' + (params?.row?.lastName ?? '')}`
    },
  },
  {
    field: 'identifier',
    headerName: 'Identificación',
    minWidth: 300,
    valueGetter: (params) => {
      return `${params?.row?.id ?? ''}`
    },
  },
  {
    field: 'email',
    headerName: 'Correo',
    minWidth: 300,
    valueGetter: (params) => `${params?.row?.email ?? ''}`,
  },
]

export const subseriesColumns = [
  {
    field: 'codigo',
    headerName: 'Código',
    minWidth: 120,
    valueGetter: (params) => `${params?.row?.codigo ?? ''}`,
  },
  {
    field: 'nombre',
    headerName: 'Nombre Subserie',
    minWidth: 120,
    valueGetter: (params) => `${params?.row?.nombre ?? ''}`,
  },
  // TODO : {
  //   field: 'office',
  //   headerName: 'Dependencia',
  //   minWidth: 120,
  //   valueGetter: (params) => (
  //     `${params?.row?.dependenciaInfo?.name ?? ''}`
  //   ),
  // },
]
export const officeColumnsVL = [
  {
    field: 'identification',
    headerName: 'Codigo',
    minWidth: 120,
    valueGetter: (params) => `${params?.row?.codigo ?? ''}`,
  },
  {
    field: 'name',
    headerName: 'Nombre',
    flex: 1,
    valueGetter: (params) => `${params?.row?.nombre ?? ''}`,
  },
]

export const isResponseSIGEDOCInput = (disabled) => ({
  name: 'isResponseSigedoc',
  label: 'Es respuesta de SIGEDOC',
  defaultValue: false,
  disabled,
})
