export const inputsAcademicFormation = () => [
  {
    label: 'Institución educativa',
    name: 'institucion_educativa',
    required: true,
    className: 'col-span-9',
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Nivel acádemico',
    name: 'nivel_academico',
    required: true,
    className: 'col-span-3',
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Titulo obtenido',
    name: 'titulo_obtenido',
    className: 'col-span-12',
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Estado del estudio',
    name: 'estado_estudio',
    className: 'col-span-4',
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Fecha de finalización',
    name: 'fecha_finalizacion',
    className: 'col-span-4',
    type: 'date',
    format: 'YYYY-MM-DD',
    disabled: true,
    slotProps: { textField: { size: 'small', InputLabelProps: { shrink: true } } },
  },
  {
    label: 'País',
    name: 'pais',
    className: 'col-span-4',
    InputLabelProps: { shrink: true },
  },
]
