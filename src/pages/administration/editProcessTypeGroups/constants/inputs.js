export const inputBasicGroups = ({ isEnabled }) => [
  {
    label: 'Nombre grupo',
    name: 'name',
    required: true,
    className: 'general_form_item xl:col-span-3',
  },
  {
    label: 'Forma radicación',
    name: 'filingForm',
    className: 'general_form_item xl:col-span-3',
  },
  {
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
    className: 'general_form_item xl:col-span-3',
  },
  {
    label: isEnabled ? 'Activo' : 'Inactivo',
    name: 'isEnabled',
    type: 'switch',
    defaultValue: true,
    className: 'general_form_item xl:col-span-3',
  },
]

export const inputsColumns = (index) => {
  return [
    {
      name: `groupSpecs.inboxProps.columns.${index}.position`,
      type: 'text',
      label: 'Posición',
      required: true,
      defaultValue: `${index + 1}`,
      className: 'general_form_item xl:col-span-2',
    },
    {
      name: `groupSpecs.inboxProps.columns.${index}.title`,
      type: 'text',
      label: 'Titulo de la columna',
      required: true,
      className: 'general_form_item xl:col-span-4',
    },
    {
      name: `groupSpecs.inboxProps.columns.${index}.source`,
      type: 'text',
      label: 'Dato de la columna',
      required: true,
      className: 'general_form_item xl:col-span-5',
    },
  ]
}
