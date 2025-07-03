export const inputsFamily = () => [
  {
    label: 'Nombre',
    name: 'nombre',
    className: 'col-span-6',
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Apellido',
    name: 'apellido',
    className: 'col-span-6',
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Parentesco',
    name: 'parentesco',
    className: 'col-span-3',
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Tipo de identificación',
    name: 'tipo_identificacion',
    className: 'col-span-3',
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Número',
    name: 'numero',
    className: 'col-span-3',
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Dependiente económicamente',
    name: 'dependiente_economicamente',
    className: 'col-span-3',
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Fecha de finalización',
    name: 'fecha_finalizacion',
    className: 'col-span-3',
    type: 'date',
    format: 'YYYY-MM-DD',
    disabled: true,
    slotProps: { textField: { size: 'small', InputLabelProps: { shrink: true } } },
  },
]
