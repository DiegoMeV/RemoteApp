export const optionsFilter = {
  name: 'filter',
  label: 'Filtro',
  type: 'select',
  options: [
    { id: 1, value: 'identifier', label: 'Nro del proceso' },
    { id: 2, value: 'idProcess', label: 'ID interno del proceso' },
    { id: 3, value: 'processTypeName', label: 'Tipo de proceso' },
    { id: 4, value: 'taxPayerData', label: 'Datos del contribuyente' },
    { id: 5, value: 'status', label: 'Estado del proceso ' },
    {
      id: 6,
      value: 'inspectionPlanIdentifier',
      label: 'Identificador programa de fiscalización',
    },
  ],
  space: 5,
}

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
