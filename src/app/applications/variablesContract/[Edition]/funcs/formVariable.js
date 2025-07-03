export const formVariable = ({ selectValueType }) => {
  const inputsVariables = [
    { name: 'nombre', label: 'Nombre', required: true, space: 6 },
    { name: 'titulo', label: 'Titulo', required: true, space: 6 },
    {
      name: 'tipo',
      label: 'Tipo',
      required: true,
      space: 4,
      type: 'select',
      options: [
        { value: 'String', label: 'Texto' },
        { value: 'number', label: 'Número' },
        { value: 'boolean', label: 'Booleano' },
        { value: 'date', label: 'Fecha' },
        { value: 'select', label: 'Selección' },
        {
          value: 'value',
          label: 'Valor',
        },
      ],
    },
    {
      name: 'dominio',
      label: 'Dominio',
      space: 6,
      helperText: selectValueType === 'select' ? 'Ejemplo: Opción1, Opción2, Opción3' : '',
    },
    {
      name: 'activo',
      label: 'Estado',
      type: 'switch',
      space: 2,
    },
    { name: 'descripcion', label: 'Descripción', type: 'multiline', minRows: 3, space: 12 },
    { name: 'requerido', label: 'Requerido', required: true, space: 2, type: 'switch' },
  ]

  return inputsVariables
}
