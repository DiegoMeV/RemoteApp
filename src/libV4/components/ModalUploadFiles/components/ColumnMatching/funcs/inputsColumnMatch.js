export const inputsColumnMatch = (columnsFile, colSpec, index) => {
  const inputs = [
    {
      name: `columnsMatch.${index}.originCol`,
      type: 'autocomplete',
      space: 3,
      autocompleteProps: {
        getOptionLabel: (option) => option ?? '',
        options: columnsFile,
        startAdornment: '',
        isOptionEqualToValue: (option, value) => option === value,
      },
      textFieldProps: {
        label: 'Columna origen',
      },
    },
    {
      name: `columnsMatch.${index}.destCol`,
      value: colSpec?.label ?? '',
      space: 3,
      label: 'Columna destino',
    },
    {
      name: `columnsMatch.${index}.format`,
      type: 'text',
      space: 2,
      textFieldProps: {
        label: 'Formato',
        fullWidth: true,
      },
    },
  ]
  return inputs
}
