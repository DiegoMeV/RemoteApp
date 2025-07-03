export const inputsResume = ({ division }) => {
  return [
    {
      label: 'Nombre',
      name: 'nombre',
      required: true,
      className: 'col-span-6',
      InputLabelProps: { shrink: true },
    },
    {
      label: 'Apellidos',
      name: 'apellidos',
      required: true,
      className: 'col-span-6',
      InputLabelProps: { shrink: true },
    },
    {
      label: 'Tipo de identificación',
      name: 'tipo',
      required: true,
      className: 'col-span-3',
      InputLabelProps: { shrink: true },
    },
    {
      label: 'Número',
      name: 'numero',
      required: true,
      className: 'col-span-3',
      InputLabelProps: { shrink: true },
    },
    {
      label: 'Departamento de expedición',
      name: 'departamento_expedicion',
      required: true,
      className: 'col-span-3',
      InputLabelProps: { shrink: true },
    },
    {
      label: 'Municipio de expedición',
      name: 'municipio_expedicion',
      required: true,
      className: 'col-span-3',
      InputLabelProps: { shrink: true },
    },
    {
      label: 'División',
      name: 'division',
      required: true,
      disabled: true,
      className: 'col-span-3',
      defaultValue: division,
      InputLabelProps: { shrink: true },
    },
  ]
}
