export const generalVar = [
  { label: 'Nombre de tipo de proceso', type: 'text', name: 'name', md: 5 },
  {
    label: 'Esquema de nomenclatura',
    type: 'text',
    name: 'numberStructure',
    md: 5,
    helperText: 'Ejemplo: ${vigencia}-EJ-${consecutivo}',
  },
  { label: 'Estado', type: 'switch', name: 'isEnabled', md: 2 },
  { label: 'Descripción', type: 'multiline', name: 'description', required: false },
  {
    label: 'Tipo de numeración por nivel',
    type: 'select',
    name: 'numByLevel',
    md: 4,
    options: [
      { label: 'Tipo de proceso', value: 'PROCESS_TYPE' },
      { label: 'Grupo', value: 'GROUP' },
    ],
  },
  {
    label: 'Tipo de numeración por origen',
    type: 'select',
    name: 'numByOrigin',
    md: 4,
    options: [
      { label: 'Por dependencia', value: 'OFFICE' },
      { label: 'Compañia', value: 'COMPANY' },
    ],
  },
  { label: 'Tiempo de gestión', type: 'number', name: 'duration', md: 2 },
  {
    label: 'Unidad de tiempo',
    type: 'select',
    name: 'durationUnit',
    md: 2,
    options: [
      { label: 'horas', value: 'HOURS' },
      { label: 'días', value: 'DAYS' },
      { label: 'días laborales', value: 'LABOR_DAYS' },
      { label: 'meses', value: 'MONTHS' },
      { label: 'años', value: 'YEARS' },
    ],
  },
]
;('HISTORICAL, YEARLY')

export const variablesInputs = [
  {
    label: 'Tipo',
    name: 'type',
    type: 'select',
    options: [
      { label: 'Texto', value: 'string' },
      { label: 'Número', value: 'number' },
      { label: 'Fecha', value: 'date' },
      { label: 'Cuadro de texto', value: 'textarea' },
      { label: 'Interruptor', value: 'switch' },
      { label: 'Selector', value: 'select' },
    ],
  },
  { label: 'Nombre', name: 'name', type: 'text' },
  { label: 'Texto de ayuda', name: 'helper', type: 'text' },
  { label: 'Requerido', name: 'isRequired', type: 'switch', xs: 6, sm: 4, md: 2 },
]
