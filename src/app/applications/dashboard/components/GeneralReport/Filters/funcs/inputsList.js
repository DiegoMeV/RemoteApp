export const inputsList = ({
  model,
  contractor,
  subContractor,
  alerts,
  addressee,
  category,
  criterionRisk,
  regions,
  province,
  citie,
  // controlSubject, TODO
}) => {
  const inputList = [
    { type: 'date', name: 'fechaRegistroAlerta', label: 'Fecha de socialización', space: 4 },
    {
      type: 'autocomplete',
      name: 'idModelo',
      label: 'Modelos',
      md: 4,
      control: model,
    },
    // { type: 'text', name: 'numeroEntrega', label: 'Número de entrega', space: 3 },
    {
      type: 'autocomplete',
      name: 'contratante',
      label: 'Contratante',
      md: 4,
      control: contractor,
      labelOption: (option) =>
        `${option.nombre_1} ${option.nombre_2 ?? ''} ${option.apellido_1 ?? ''} ${
          option.apellido_2 ?? ''
        }`,
    },
    {
      type: 'autocomplete',
      name: 'contratista',
      label: 'Contratista',
      md: 4,
      control: subContractor,
      labelOption: (option) =>
        `${option.nombre_1} ${option.nombre_2 ?? ''} ${option.apellido_1 ?? ''} ${
          option.apellido_2 ?? ''
        }`,
    },
    {
      type: 'autocomplete',
      name: 'idAlerta',
      label: 'Alerta',
      md: 4,
      control: alerts,
    },
    {
      type: 'autocomplete',
      name: 'destinatario',
      label: 'Destinatario',
      md: 4,
      control: addressee,
    },
    {
      type: 'autocomplete',
      name: 'categoria',
      label: 'Categoría',
      md: 4,
      control: category,
    },
    {
      type: 'autocomplete',
      name: 'criterio',
      label: 'Criterio de riesgo',
      md: 4,
      control: criterionRisk,
    },
    // {
    //   type: 'autocomplete',
    //   name: 'controlSubject',
    //   label: 'Sujeto de control',
    //   md: 4,
    //   control: controlSubject,
    // },
    {
      type: 'select',
      name: 'estadoAlerta',
      label: 'Estado',
      noDefaultValue: true,
      space: 4,
      options: [
        { value: '', label: 'Todos' },
        { value: 'PENDIENTE', label: 'Pendiente' },
        { value: 'APROBADA', label: 'Aprobada' },
      ],
    },
    {
      type: 'autocomplete',
      name: 'region',
      label: 'Región',
      md: 4,
      control: regions,
    },
    {
      type: 'autocomplete',
      name: 'departamento',
      label: 'Departamento',
      md: 4,
      control: province,
    },
    {
      type: 'autocomplete',
      name: 'municipio',
      label: 'Municipio',
      md: 4,
      control: citie,
    },
  ]
  return inputList
}
