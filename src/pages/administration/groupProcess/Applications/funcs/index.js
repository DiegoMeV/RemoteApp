export const inputsApplication = [
  {
    name: 'name',
    label: 'Nombre',
    required: true,
    className: 'general_form_item 2xl:col-span-4',
  },
  {
    name: 'shortName',
    label: 'Nombre corto',
    className: 'general_form_item 2xl:col-span-3',
  },
  {
    name: 'identifier',
    label: 'Identificador',
    required: true,
    className: 'general_form_item 2xl:col-span-3',
  },
  {
    name: 'isEnabled',
    label: 'Habilitado',
    defaultValue: true,
    type: 'switch',
    className: 'general_form_item 2xl:col-span-1',
  },
  {
    name: 'description',
    label: 'Descripción',
    type: 'text',
    multiline: true,
    minRows: 3,
    maxRows: 5,
    className: 'col-span-12',
  },
]
