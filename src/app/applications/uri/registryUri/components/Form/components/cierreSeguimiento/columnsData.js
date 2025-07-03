export const columnsData = ({ workZone, form }) => {
  const columns = [
    {
      name: 'estado_seguimiento',
      type: 'select',
      label: 'Estado de seguimiento',
      options: [
        { label: 'EN EJECUCION', value: 'EN EJECUCION' },
        { label: 'CERRADO', value: 'CERRADO' },
        { label: 'CANCELADO', value: 'CANCELADO' },
      ],
      space: 4,
    },
    {
      name: 'fecha_asignacion_coordinador',
      label: 'Fecha asignación coordinador',
      type: 'date',
      space: 4,
    },
    {
      name: 'id_region_alertada',
      label: 'Región de trabajo',
      type: 'autoCompleteSelect',
      space: 4,
      data: workZone?.data,
      onChange: (e) => {
        form.setValue('id_region_alertada', e.id)
      },
      required: true,
    },

    {
      name: 'beneficio_seguimiento',
      type: 'multiline',
      label: 'Beneficio seguimiento',
      minrows: 3,
      space: 12,
    },
    {
      name: 'descripcion_beneficio',
      type: 'multiline',
      label: 'Descripción beneficio',
      minrows: 3,
      space: 12,
    },
    {
      name: 'gestiones_relevantes',
      type: 'multiline',
      label: 'Gestiones relevantes',
      minrows: 3,
      space: 12,
    },
    {
      name: 'resultado_seguimiento',
      type: 'select',
      label: 'Resultado seguimiento',
      noDefaultValue: true,
      options: [
        { label: 'TRASLADO', value: 'TRASLADO' },
        { label: 'ARCHIVO', value: 'ARCHIVO' },
        { label: 'BENEFICIO CUALITATIVO', value: 'BENEFICIO CUALITATIVO' },
        { label: 'BENEFICIO CUANTITATIVO ', value: 'BENEFICIO CUANTITATIVO ' },
        { label: 'CANCELADO', value: 'CANCELADO' },
        { label: 'OTRO', value: 'OTRO' },
      ],
      space: 4,
    },
    {
      name: 'fecha_actualizada_fin_seguimiento',
      type: 'date',
      label: 'Fecha actualizada fin seguimiento',
      space: 4,
    },
    {
      name: 'beneficiarios',
      type: 'text',
      label: 'Beneficiarios',
      space: 4,
    },
  ]
  return columns
}
