export const inputsEntity = (dependencias, modalDependencias, isLoading, handleSearch) => {
  return [
    { name: 'identificacion', label: 'ID sujeto', required: true, space: 3 },
    { name: 'nombre', label: 'Nombre', required: true, space: 7 },
    { name: 'activo', label: 'Estado', required: true, type: 'switch', space: 2 },
    {
      name: 'dependencia_comp',
      label: 'Competencía',

      type: 'autoCompleteSelect',
      space: 4,
      data: dependencias?.data,
      isLoading: isLoading,
      handleSearch: handleSearch,
      openModal: modalDependencias?.handleShow,
    },
    {
      name: 'fecha_resolucion',
      label: 'Fecha de resolución',
      type: 'date',
      space: 3,
    },
    { name: 'vigencia', label: 'Año', space: 2, type: 'number' },
    { name: 'resolucion', label: 'Resolución', space: 3 },
  ]
}
