export const compromiseInputs = ({ isTotallyApp }) => {
  return [
    {
      name: 'descripcion',
      label: 'Descripción',
      required: true,
      fullWidth: true,
      multiline: true,
      minRows: 3,
      maxRows: 5,
      space: 12,
      disabled: isTotallyApp,
    },
    {
      name: 'responsable_cumplimiento',
      label: 'Responsable cumplimiento',
      required: true,
      space: 12,
      disabled: isTotallyApp,
    },
    {
      name: 'fecha_inicial_cumplimiento',
      label: 'Fecha inicial cumplimiento',
      required: true,
      type: 'date',
      space: 6,
    },
    {
      name: 'fecha_real_cumplimiento',
      label: 'Fecha cumplimiento',
      type: 'date',
      space: 6,
    },
  ]
}
