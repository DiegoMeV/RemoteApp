export const generalVar = [
  {
    label: 'Nombre de tipo de proceso',
    type: 'text',
    name: 'name',
    className: 'general_form_item xl:col-span-5',
  },
  {
    label: 'Esquema de nomenclatura',
    type: 'text',
    name: 'numberStructure',
    helperText: 'Ejemplo: ${vigencia}-EJ-${consecutivo}',
    className: 'general_form_item xl:col-span-5',
  },
  {
    label: 'Estado',
    type: 'switch',
    name: 'isEnabled',
    defaultValue: true,
    className: 'general_form_item xl:col-span-2',
  },
  {
    label: 'Descripción',
    name: 'description',
    type: 'text',
    required: false,
    multiline: true,
    minRows: 3,
    maxRows: 5,
    className: 'col-span-12',
  },
  {
    label: 'Tipo de numeración por nivel',
    type: 'select',
    name: 'numByLevel',
    defaultValue: 'PROCESS_TYPE',
    options: [
      { label: 'Tipo de proceso', value: 'PROCESS_TYPE' },
      { label: 'Grupo', value: 'GROUP' },
    ],
    className: 'general_form_item xl:col-span-4',
  },
  {
    label: 'Tipo de numeración por origen',
    type: 'select',
    name: 'numByOrigin',
    className: 'general_form_item xl:col-span-4',
    defaultValue: 'OFFICE',
    options: [
      { label: 'Por dependencia', value: 'OFFICE' },
      { label: 'Compañia', value: 'COMPANY' },
    ],
  },
  {
    label: 'Tiempo de gestión',
    type: 'number',
    name: 'duration',
    className: 'general_form_item xl:col-span-4',
  },
  {
    label: 'Unidad de tiempo',
    type: 'select',
    name: 'durationUnit',
    defaultValue: 'HOURS',
    options: [
      { label: 'horas', value: 'HOURS' },
      { label: 'días', value: 'DAYS' },
      { label: 'días laborales', value: 'LABOR_DAYS' },
      { label: 'meses', value: 'MONTHS' },
      { label: 'años', value: 'YEARS' },
    ],
    className: 'general_form_item xl:col-span-6',
  },
  { label: 'Alias', type: 'text', name: 'keyName', className: 'general_form_item md:col-span-6' },
]

export const variablesInputs = (index) => [
  {
    label: 'Tipo',
    name: `typeSpecs.additionalData.${index}.type`,
    type: 'select',
    required: true,
    options: [
      { label: 'Texto', value: 'string' },
      { label: 'Número', value: 'number' },
      { label: 'Fecha', value: 'date' },
      { label: 'Cuadro de texto', value: 'textarea' },
      { label: 'Interruptor', value: 'switch' },
      { label: 'Selector', value: 'select' },
    ],
    className: 'general_form_item xl:col-span-3',
  },
  {
    label: 'Nombre',
    name: `typeSpecs.additionalData.${index}.name`,
    type: 'text',
    required: true,
    className: 'general_form_item xl:col-span-3 2xl:col-span-4',
  },
  {
    label: 'Texto de ayuda',
    name: `typeSpecs.additionalData.${index}.helper`,
    type: 'text',
    className: 'general_form_item xl:col-span-3',
  },
  {
    label: 'Requerido',
    name: `typeSpecs.additionalData.${index}.isRequired`,
    type: 'switch',
    defaultValue: false,
    className: 'general_form_item xl:col-span-2 2xl:col-span-1',
  },
]
export const variablesInputsInherited = (index) => {
  const fields = [
    {
      label: 'Tipo de actor del proceso padre',
      nameSuffix: '[0]',
      className: 'general_form_item sm:col-span-5',
    },
    {
      label: 'tipo de actor del proceso hijo',
      nameSuffix: '[1]',
      className: 'general_form_item xl:col-span-5',
    },
  ]

  return fields.map(({ label, nameSuffix, className }) => ({
    label,
    name: `typeSpecs.parentProcessActions.actorTypesTranslation[${index}]${nameSuffix}`,
    type: 'autocompleteRequest',
    requestprops: {
      isCompanyRequest: false,
      baseKey: 'urlProcess',
      url: '/actor-types',
    },
    vlprops: {
      shouldClose: true,
      toolbarProps: {
        searchProps: {},
      },
      columns: [
        {
          dataIndex: 'name',
          title: 'Tipo de actor',
          render: (_, row) => `${row?.name ?? ''}`,
        },
        {
          dataIndex: 'description',
          title: 'Descripción',
          render: (_, row) => `${row?.description ?? ''}`,
        },
      ],
    },
    autocompleteprops: {
      getOptionLabel: (option) => `${option?.name ?? ''}`,
      getId: 'keyName',
    },
    validate: false,
    className,
  }))
}

export const transferData = ({ index }) => [
  {
    label: 'Nombre de la llave a transferir',
    type: 'text',
    name: `typeSpecs.parentProcessActions.processDataKeys[${index}]`,
    className: 'col-span-11',
  },
]
