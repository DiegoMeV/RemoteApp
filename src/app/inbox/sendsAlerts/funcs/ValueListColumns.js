export const columnsDependencies = [
  {
    field: 'name',
    headerName: 'Dependencia',
    width: 200,
  },
]

export const columnsProcessTypes = [
  {
    field: 'name',
    headerName: 'Nombre',
    width: 200,
  },
  {
    field: 'description',
    headerName: 'Descripción',
    width: 200,
  },
]

export const columnsAlertModels = [
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 200,
  },
  {
    field: 'descripcion',
    headerName: 'Descripción',
    width: 200,
  },
]

export const columnsOfficesDestination = [
  {
    field: 'TRDcode',
    headerName: 'Codigo TRD',
    minWidth: 150,
  },
  {
    field: 'name',
    headerName: 'Nombre',
    minWidth: 200,
  },
]

export const columnsOfSeries = [
  {
    field: 'codigo',
    headerName: 'Código',
    minWidth: 120,
    valueGetter: (params) => `${params?.row?.codigo ?? ''}`,
  },
  {
    field: 'nombre',
    headerName: 'Nombre',
    minWidth: 120,
    valueGetter: (params) => `${params?.row?.nombre ?? ''}`,
  },
]

export const columnsOfSubSeries = [
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 200,
  },
  {
    field: 'numero',
    headerName: 'Número',
    width: 200,
  },
  {
    field: 'codigoTrdDependencia',
    headerName: 'Código TRD dependencia',
    width: 200,
  },
]

export const columnsOfCarpetas = [
  {
    field: 'serie',
    headerName: 'Serie',
    minWidth: 120,
    valueGetter: (params) => `${params?.row?.serie?.codigo ?? ''}`,
  },
  {
    field: 'nombre',
    headerName: 'Nombre carpeta',
    minWidth: 120,
    valueGetter: (params) => `${params?.row?.nombre ?? ''}`,
  },
]

export const columnsOfTipoDocumentales = [
  {
    field: 'nombre',
    headerName: 'Nombre',
    minWidth: 400,
    valueGetter: (params) => `${params?.row?.nombre ?? ''}`,
  },
]

export const columnsOfTipoDocumento = [
  {
    field: 'codigoInterno',
    headerName: 'Código interno',
    minWidth: 150,
  },
  {
    field: 'nombre',
    headerName: 'Nombre',
    minWidth: 300,
  },
]

export const columnsOfUser = [
  {
    field: 'identificacion',
    headerName: 'Documento de identidad',
    minWidth: 150,
  },
  {
    field: 'nombre',
    headerName: 'Nombre',
    minWidth: 200,
  },
  {
    field: 'apellidos',
    headerName: 'Apellido',
    minWidth: 200,
  },
]
