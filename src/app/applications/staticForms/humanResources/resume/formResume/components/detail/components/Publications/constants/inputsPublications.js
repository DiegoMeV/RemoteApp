export const inputsPublications = () => [
  {
    label: 'Nombre del articulo o publicación',
    name: 'nombre_articulo',
    className: 'col-span-12',
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Tipo de articulo',
    name: 'tipo_articulo',
    className: 'col-span-3',
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Nombre del libro o revista',
    name: 'nombre_libro',
    className: 'col-span-9',
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Libro resultado de la investigación',
    name: 'libro_resultado_investigacion',
    className: 'col-span-9',
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Fecha de publicación',
    name: 'fecha_publicacion',
    className: 'col-span-3',
    type: 'date',
    format: 'YYYY-MM-DD',
    required: true,
    slotProps: { textField: { size: 'small', InputLabelProps: { shrink: true } } },
  },
]
