export const inputsRechazos = () => {
  return [
    {
      name: 'orden_pago.rechazada',
      label: 'Rechazada',
      type: 'switch',
      className: 'general_form_item md:col-span-6',
    },
    {
      name: 'orden_pago.descripcion_rechazo',
      label: 'Descripción rechazo',
      multiline: true,
      minRows: 3,
      className: 'col-span-12',
    },
  ]
}
