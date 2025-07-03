import { formatDateForTextfield } from '@/lib'

export const columnsAlertDetail = [
  {
    field: 'identificador',
    headerName: 'Identificador',
    width: 200,
  },
  {
    field: 'nombre',
    headerName: 'Modelo',
    width: 300,
  },
  {
    field: 'fecha_registro',
    headerName: 'Fecha de Registro',
    width: 150,
    valueGetter: (params) => {
      return `${formatDateForTextfield(params.row?.fecha_registro)}`
    },
  },
  {
    field: 'estado',
    headerName: 'Estado',
    width: 200,
  },
  {
    field: 'region_nombre',
    headerName: 'Región',
    width: 200,
  },
  {
    field: 'departamento_nombre',
    headerName: 'Departamento',
    width: 200,
  },
  {
    field: 'municipio_nombre',
    headerName: 'municipio',
    width: 200,
  },
  {
    field: 'vigencia',
    headerName: 'Vigencia',
    width: 100,
  },
]
