import { formatToLocaleDate } from '@/lib'

export const inputsFormFilter = ({ ari, province, cities, coordinator, entities }) => {
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
      type: 'number',
      name: 'fechaRecepAlerta',
      label: 'Vigencia',
      space: 4,
      valueGetter: (params) => `${formatToLocaleDate(params?.value)}`,
    },
    {
      type: 'autocomplete',
      name: 'departamento',
      label: 'Departamento',
      md: 4,
      control: province,
      labelOption: (option) => `${option.nombre}`,
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
      labelOption: (option) => `${option.nombre}`,
      columnsModal: [
        {
          field: 'nombre',
          headerName: 'Nombre',
          flex: 1,
        },
      ],
    },
    {
      type: 'autocomplete',
      name: 'entidad',
      label: 'Entidad',
      md: 4,
      control: entities,
      labelOption: (option) => `${option.nombre}`,
      columnsModal: [
        {
          field: 'nombre',
          headerName: 'Nombre',
          flex: 1,
        },
      ],
    },
    {
      name: 'sectorAlertado',
      type: 'select',
      label: 'Sector alertado',
      space: 4,
      noDefaultValue: true,
      options: [
        {
          label: 'NINGUNO',
          value: '',
        },
        { label: 'SALUD', value: 'SALUD' },
        { label: 'VIVIENDA', value: 'VIVIENDA' },
        { label: 'AGUA Y SANEAMIENTO POTABLE', value: 'AGUA Y SANEAMIENTO POTABLE' },
        { label: 'INFRAESTRUCTURA', value: 'INFRAESTRUCTURA' },
        { label: 'MITIGACIÓN DEL RIESGO', value: 'MITIGACIÓN DEL RIESGO' },
        { label: 'EDUCACIÓN', value: 'EDUCACIÓN' },
        { label: 'JUSTICIA', value: 'JUSTICIA' },
        { label: 'DEFENSA Y SEGURIDAD', value: 'DEFENSA Y SEGURIDAD' },
        { label: 'INCLUSIÓN SOCIAL', value: 'INCLUSIÓN SOCIAL' },
        { label: 'PLAN ALIMENTARIO ESCOLAR (PAE)', value: 'PLAN ALIMENTARIO ESCOLAR (PAE)' },
        { label: 'MITIGACION DEL RIESGO', value: 'MITIGACION DEL RIESGO' },
      ],
    },
    {
      type: 'autocomplete',
      name: 'coordinador',
      label: 'Coordinador',
      md: 8,
      control: coordinator,
      labelOption: (option) =>
        `${option.dataUser.firstName} ${option.dataUser?.lastName ?? ''} - ${
          option.dataEquipoUri?.nombre ?? ''
        }`,
      columnsModal: [
        {
          field: 'firstName',
          headerName: 'Nombre',
          width: 300,
          valueGetter: (params) => `${params.row.dataUser?.firstName ?? ''}`,
        },
        {
          field: 'lastName',
          headerName: 'Apellido',
          width: 300,
          valueGetter: (params) => `${params.row.dataUser?.lastName ?? ''}`,
        },
        {
          field: 'dataEquipoUri.nombre',
          headerName: 'Equipo',
          width: 200,
          valueGetter: (params) => `${params.row.dataEquipoUri?.nombre ?? ''} `,
        },
      ],
    },
  ]
  return inputList
}
