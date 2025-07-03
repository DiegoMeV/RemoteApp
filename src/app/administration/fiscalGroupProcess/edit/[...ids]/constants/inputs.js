export const inputBasicGroups = [
  {
    label: 'Nombre grupo',
    name: 'name',
    required: true,
    xs: 6,
    sm: 5,
    space: 3,
  },
  {
    label: 'Forma radicación',
    name: 'filingForm',
    xs: 6,
    sm: 5,
    space: 3,
  },
  {
    label: 'Configuración de historial',
    name: 'groupSpecs.historyConfig.showAssignedMode',
    required: true,
    type: 'select',
    defaultValue: 'USER',
    space: 3,
    options: [
      { value: 'USER', label: 'Usuario' },
      { value: 'OFFICE', label: 'Dependencia' },
      { value: 'NONE', label: 'Ninguno' },
    ],
  },
  {
    label: 'Estado',
    name: 'isEnabled',
    sm: 2,
    space: 3,
    type: 'switch',
  },
]
