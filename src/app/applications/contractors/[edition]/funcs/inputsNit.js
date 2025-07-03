export const getInputsVariablesToShow = (tipoIdentificacion, inputsVariables) => {
  return tipoIdentificacion === 'NIT'
    ? inputsVariables.filter(
        (input) =>
          !['Primer nombre', 'Segundo nombre', 'Primer apellido', 'Segundo apellido'].includes(
            input.label
          )
      )
    : inputsVariables.filter((input) => !['Razón social'].includes(input.label))
}

export const inputsVariables = () => {
  return [
    {
      name: 'nro_identificacion',
      label: 'Número de identificación',
      type: 'number',
      space: 4,
      required: true,
    },
    { name: 'nombre_1', label: 'Primer nombre', space: 4, required: true },
    { name: 'nombre_1', label: 'Razón social', space: 4 },
    { name: 'nombre_2', label: 'Segundo nombre', space: 4 },
    { name: 'apellido_1', label: 'Primer apellido', space: 4 },
    { name: 'apellido_2', label: 'Segundo apellido', space: 4 },
    { name: 'entidad_contratante', label: 'Entidad contratante', space: 4, type: 'switch' },
  ]
}

export const adaptDefaultValues = (infoEditing) => {
  const defaultValues = {
    ...infoEditing?.data[0],
    tipo_identificacion: infoEditing?.data[0]?.tipo_identificacion || 'CC',
  }
  delete defaultValues?.id_compania
  delete defaultValues?.nombre_completo
  delete defaultValues?.usuario_audita
  delete defaultValues?.fecha_audita
  return defaultValues
}
