export const inputBasicGroups = [
  {
    label: 'Nombre grupo',
    name: 'name',
    required: true,
    xs: 6,
    space: 2.5,
  },
  {
    label: 'Forma radicación',
    name: 'filingForm',
    xs: 6,
    space: 2.5,
  },
  {
    xs: 6,
    space: 2.5,
    label: 'Configuración de historial',
    name: 'groupSpecs.historyConfig.showAssignedMode',
    required: true,
    type: 'select',
    defaultValue: 'USER',
    options: [
      { value: 'USER', label: 'Usuario' },
      { value: 'OFFICE', label: 'Dependencia' },
      { value: 'NONE', label: 'Ninguno' },
    ],
  },
  {
    xs: 6,
    space: 2.5,
    type: 'select',
    label: 'Tipo de impuesto',
    name: 'taxType',
    options: [
      { value: 'I', label: 'Industria y Comercio' },
      { value: 'P', label: 'Impuesto Predial' },
      { value: 'O', label: 'Rentas varias' },
    ],
  },
  {
    label: 'Estado',
    name: 'isEnabled',
    xs: 6,
    space: 1,
    type: 'switch',
  },
]
