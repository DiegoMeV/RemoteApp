export const inputsWorkHistory = () => [
  {
    label: 'Institución educativa',
    name: 'institucion_educativa',
    className: 'col-span-6',
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Nivel académico',
    name: 'nivel_academico',
    className: 'col-span-6',
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Título obtenido',
    name: 'titulo_obtenido',
    className: 'col-span-3',
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Estado del estudio',
    name: 'estado_estudio',
    className: 'col-span-3',
    InputLabelProps: { shrink: true },
  },
  {
    label: 'País',
    name: 'pais',
    className: 'col-span-3',
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Certificado cargado',
    name: 'certificado_cargado',
    className: 'col-span-3',
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Verificado',
    name: 'verificado',
    className: 'col-span-3',
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Fecha de finalización',
    name: 'fecha_finalizacion',
    className: 'col-span-3',
    type: 'date',
    format: 'YYYY-MM-DD',
    slotProps: { textField: { size: 'small', InputLabelProps: { shrink: true } } },
  },
]
