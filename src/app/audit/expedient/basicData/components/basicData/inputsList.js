export const inputsList = [
  {
    label: 'Número',
    name: 'number',
    type: 'number',
    disabled: true,
    space: 3,
  },
  {
    label: 'Fecha de inicio',
    name: 'startDate',
    type: 'date',
    disabled: true,
    space: 3,
  },
  {
    label: 'Fecha cierre',
    name: 'endDate',
    type: 'date',
    disabled: true,
    space: 3,
  },
  {
    label: 'estado',
    name: 'state',
    type: 'select',
    options: [
      { label: 'Activo', value: 'active' },
      { label: 'Inactivo', value: 'inactive' },
    ],
    space: 3,
  },
  {
    label: 'Nombre tipo',
    name: 'type',
    type: 'text',
    space: 12,
  },
  {
    label: 'Observaciones',
    name: 'observation',
    type: 'multiline',
    minRows: 3,
    space: 12,
  },
  {
    label: 'Responsable',
    name: 'responsible',
    type: 'text',
    disabled: true,
    space: 3,
  },
  {
    label: 'Programa',
    name: 'program',
    type: 'text',
    disabled: true,
    space: 3,
  },
  {
    label: 'Descripción del programa',
    name: 'programDescription',
    type: 'text',
    disabled: true,
    space: 6,
  },
]
