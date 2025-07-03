export const menuOptions = [
  {
    id: 'dues',
    label: 'Documentos convenio',
  },
  {
    id: 'receiptsIssued',
    label: 'Liquidar cuotas',
  },
  {
    id: 'payments',
    label: 'Imprimir cuotas y pagos',
  },
  {
    id: 'generateReceipts',
    label: 'Imprimir detalle de pagos',
  },
]

export const colorStatus = {
  pendiente: 'bg-yellow-100 text-yellow-800',
  pagado: 'bg-green-100 text-green-800',
  anulado: 'bg-red-100 text-red-800',
  liquidado: 'bg-blue-100 text-blue-800',
}

export const titleBlock = {
  V: 'Sistema de Convenios Vehiculares',
  default: 'Sistema de Acuerdos de Pago',
}
