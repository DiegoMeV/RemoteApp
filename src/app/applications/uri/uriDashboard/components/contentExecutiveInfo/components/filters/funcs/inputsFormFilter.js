export const inputsFormFilter = ({ ari, province, cities, region, contractor }) => {
  const inputList = [
    {
      type: 'autocomplete',
      name: 'ari',
      label: 'ARI',
      md: 4,
      control: ari,
      labelOption: (option) => `${option.sigedoc_inclusion ?? ''}`,
      columnsModal: [
        {
          field: 'caso_individual_cat',
          headerName: 'Caso individual cat',
          width: 300,
        },
        {
          field: 'sigedoc_inclusion',
          headerName: 'Sigedoc Inclusión',
          width: 200,
        },
        {
          field: 'modelo',
          headerName: 'Modelo',
          width: 200,
        },
        {
          field: 'sector_alertado',
          headerName: 'Sector Alertado',
          width: 200,
        },
        {
          field: 'entidad',
          headerName: 'Entidad',
          width: 200,
        },
      ],
    },
    {
      type: 'autocomplete',
      name: 'region',
      label: 'Region',
      md: 4,
      control: region,
      labelOption: (option) => `${option.nombre ?? '---'}`,
      columnsModal: [
        {
          field: 'nombre',
          headerName: 'Nombre',
          width: 200,
        },
      ],
    },
    {
      type: 'autocomplete',
      name: 'departamento',
      label: 'Departamento',
      md: 4,
      control: province,
      labelOption: (option) => `${option.nombre ?? ''}`,
      columnsModal: [
        {
          field: 'nombre',
          headerName: 'Nombre',
          width: 200,
        },
      ],
    },
    {
      type: 'autocomplete',
      name: 'municipio',
      label: 'Municipio',
      md: 4,
      control: cities,
      labelOption: (option) => `${option.nombre ?? ''}`,
      columnsModal: [
        {
          field: 'nombre',
          headerName: 'Nombre',
          width: 200,
        },
      ],
    },
    {
      type: 'autocomplete',
      name: 'contratanteEjecutor',
      label: 'Contratante ejecutor',
      md: 4,
      control: contractor,
      labelOption: (option) => `${option.nombre ?? '---'}`,
      columnsModal: [
        {
          field: 'nombre',
          headerName: 'Nombre',
          width: 200,
        },
      ],
    },
    {
      name: 'estadoSeguimiento',
      type: 'select',
      label: 'Estado de seguimiento',
      noDefaultValue: true,
      options: [
        {
          label: 'NINGUNO',
          value: '',
        },
        { label: 'EN EJECUCION', value: 'EN EJECUCION' },
        { label: 'CERRADO', value: 'CERRADO' },
        { label: 'CANCELADO', value: 'CANCELADO' },
      ],
      space: 4,
    },
  ]
  return inputList
}
