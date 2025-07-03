export const inputsList = [
  {
    name: 'prefijo',
    type: 'text',
    space: 4,
    label: 'Prefijo',
    disabled: true,
  },
  {
    name: 'nrodoc',
    type: 'text',
    space: 4,
    label: 'Numero de orden de pago',
    disabled: true,
  },
  {
    name: 'fecha',
    type: 'date',
    space: 4,
    label: 'Fecha orden',
    disabled: true,
  },
  {
    name: 'valor',
    type: 'money',
    space: 4,
    label: 'Valor',
    disabled: true,
  },
  {
    name: 'terceroType',
    type: 'text',
    space: 4,
    label: 'Tipo tercero',
    disabled: true,
  },

  {
    name: 'tercero',
    type: 'text',
    space: 4,
    label: 'Tercero',
    disabled: true,
  },
  {
    name: 'nombreCompletoTercero',
    type: 'text',
    space: 4,
    label: 'Nombre tercero',
    disabled: true,
  },
  {
    name: 'approvalDate',
    type: 'date',
    space: 4,
    label: 'Fecha de aprobacion',
    disableFuture: true,
    validate: (value) => {
      if (value > new Date()) {
        return 'No puede ser mayor a la fecha actual'
      }
      return true
    },
  },
  {
    type: 'button',
    children: 'Aprobar orden',
    space: 4,
    typeButton: 'submit',
  },
]

export const inputsForPayOrder = (payOrderData) => [
  {
    name: 'prefijo',
    type: 'text',
    label: 'Prefijo',
    value: payOrderData?.prefijo,
    disabled: true,
    className: 'general_form_item lg:col-span-4',
  },
  {
    name: 'nrodoc',
    type: 'text',
    label: 'Numero de orden de pago',
    value: payOrderData?.nrodoc,
    disabled: true,
    className: 'general_form_item lg:col-span-4',
  },
  {
    name: 'fecha',
    type: 'date',
    label: 'Fecha orden',
    value: payOrderData?.fecha,
    disabled: true,
    className: 'general_form_item lg:col-span-4',
  },
  {
    name: 'valor',
    type: 'money',
    label: 'Valor',
    value: payOrderData?.valor,
    disabled: true,
    className: 'general_form_item lg:col-span-4',
  },
  {
    name: 'terceroType',
    type: 'text',
    label: 'Tipo tercero',
    value: payOrderData?.terceroType,
    disabled: true,
    className: 'general_form_item lg:col-span-4',
  },

  {
    name: 'tercero',
    type: 'text',
    label: 'Tercero',
    value: payOrderData?.tercero,
    disabled: true,
    className: 'general_form_item lg:col-span-4',
  },
  {
    name: 'nombreCompletoTercero',
    type: 'text',
    label: 'Nombre tercero',
    value: payOrderData?.nombreCompletoTercero,
    disabled: true,
    className: 'general_form_item lg:col-span-4',
  },
  //   {
  //     name: 'approvalDate',
  //     type: 'date',
  //     space: 4,
  //     label: 'Fecha de aprobacion',
  //     disableFuture: true,
  //     validate: (value) => {
  //       if (value > new Date()) {
  //         return 'No puede ser mayor a la fecha actual'
  //       }
  //       return true
  //     },
  //   },
  //   {
  //     type: 'button',
  //     children: 'Aprobar orden',
  //     space: 4,
  //     typeButton: 'submit',
  //   },
]
