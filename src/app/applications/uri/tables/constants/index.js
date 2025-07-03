export const actionReviewTable = {
  RECHAZADO: {
    icon: 'error',
    title: 'Rechazar',
    content: '¿Está seguro de rechazar la mesa?',
  },
  APROBACIONES: {
    icon: 'success',
    title: 'Aprobar',
    content: '¿Está seguro de aprobar la mesa?',
  },
  PENDIENTE: {
    icon: 'question',
    title: 'Pendiente',
    content: '¿Está seguro de cambiar el estado?',
  },
}

export const inputsToGenerateActa = [
  {
    name: 'CONTRATISTA_PROYECTO',
    label: 'Contratista del proyecto',
    type: 'text',
  },
  {
    name: 'FECHA_LIBERACION_INFORME',
    label: 'Fecha de liberación del informe',
    type: 'date',
  },
]
