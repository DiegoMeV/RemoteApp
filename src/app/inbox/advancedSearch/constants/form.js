export const optionsFilter = {
  name: 'filter',
  label: 'Filtro',
  type: 'select',
  options: [
    { id: 1, value: 'identifier', label: 'Nro del proceso' },
    { id: 2, value: 'idProcess', label: 'ID interno del proceso' },
    { id: 3, value: 'processTypeName', label: 'Tipo de proceso' },
    { id: 4, value: 'actorName', label: 'Actor del proceso' },
    { id: 5, value: 'status', label: 'Estado del proceso ' },
  ],
  space: 5,
}

export const filtersProcessPayment = [
  { id: 1, value: 'processData.contractData.prefijo', label: 'Prefijo Contrato' },
  { id: 3, value: 'payOrderDocYear', label: 'Prefijo Orden de Pago' },
  { id: 2, value: 'processData.contractData.nrodoc', label: 'Número Contrato' },
  { id: 4, value: 'payOrderDocNumber', label: 'Número Orden Pago' },
  { id: 5, value: 'processData.payFormData.nrodoc', label: 'Número de Planilla' },
]

export const filtersPresupuestal = [
  { id: 1, value: 'finantialDocType', label: 'Tipo de documento' },
  { id: 3, value: 'finantialDocNumber', label: 'Nro de documento' },
  { id: 2, value: 'finantialDocYear', label: 'Vigencia' },
]

export const selects = {
  status: [
    { value: 'PROGRESS', label: 'En progreso' },
    { value: 'COMPLETED', label: 'Completado' },
    { value: 'SUSPENDED', label: 'Suspendido' },
    { value: 'INREVIEW', label: 'En revisión' },
    { value: 'REVIEWED', label: 'Revisado' },
    { value: 'PARTIALCOMPLETED', label: 'Completado parcialmente' },
    { value: 'CANCELLED', label: 'Anulado' },
  ],
  finantialDocType: [
    { value: 'SOLICITUD', label: 'Solicitud de CDP' },
    { value: 'DISPONIBILIDAD', label: 'CDP' },
    { value: 'COMPROMISO', label: 'Registro Presupuestal' },
  ],
}
