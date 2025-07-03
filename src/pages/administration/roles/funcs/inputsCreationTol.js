export const inputsCreationTol = [
  {
    label: 'Nombre',
    name: 'name',
    type: 'text',
    className: 'col-span-12',
  },
  {
    label: 'Tipo de rol',
    name: 'typeRole',
    type: 'select',
    options: [
      {
        label: 'Operativo',
        value: 'OPERATIONAL',
      },
      {
        label: 'De sistema',
        value: 'SYSTEM',
      },
    ],
    className: 'col-span-12',
  },
  {
    label: 'Descripción',
    name: 'description',
    type: 'text',
    multiline: true,
    minRows: 3,
    maxRows: 5,
    className: 'col-span-12',
  },
  {
    label: 'Para dependencia',
    name: 'byDependency',
    type: 'switch',
    defaultValue: true,
    className: 'col-span-6',
  },
]
