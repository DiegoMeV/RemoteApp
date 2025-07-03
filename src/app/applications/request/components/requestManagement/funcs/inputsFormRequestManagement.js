export const inputsFormRequestManagement = ({ lovAnalyst, lovHierarchy }) => {
  const inputsFormRequestManagement = [
    { label: 'Id único', name: 'identifier', type: 'text', space: 12 },
    {
      label: 'Delegada / Entidad solicitante',
      name: 'delegateApplicantEntity',
      type: 'autoCompleteSelect',
      space: 12,
      data: lovHierarchy?.dataList?.data,
      openModal: lovHierarchy?.controlModal.handleShow,
      handleSearch: lovHierarchy?.controlSearch?.handleSearchText,
      isLoading: lovHierarchy?.isLoading,
    },
    { label: 'Fecha inicio', name: 'after', type: 'date', space: 6 },
    { label: 'Fecha final', name: 'before', type: 'date', space: 6 },
    { label: 'SIGEDOC entrante', name: 'sigedocIngoing', type: 'text', space: 6 },
    { label: 'SIGEDOC saliente', name: 'sigedocOutgoing', type: 'text', space: 6 },
    { label: 'Vigencia', name: 'validityPeriods', type: 'text', space: 6 },
    {
      label: 'Estado',
      name: 'status',
      type: 'select',
      space: 6,
      options: [
        {
          label: 'Ninguno',
          value: '',
        },
        { value: 'PROGRESS', label: 'En progreso' },
        { value: 'COMPLETED', label: 'Completado' },
        { value: 'SUSPENDED', label: 'Suspendido' },
        { value: 'INREVIEW', label: 'En revisión' },
        { value: 'REVIEWED', label: 'Revisado' },
        { value: 'CANCELLED', label: 'Anulado' },
        { value: 'PARTIALCOMPLETED', label: 'Completado parcialmente' },
      ],
    },
    {
      label: 'Analista',
      name: 'idAnalyst',
      type: 'autoCompleteSelect',
      space: 12,
      data: lovAnalyst?.dataList?.data,
      openModal: lovAnalyst?.controlModal.handleShow,
      handleSearch: lovAnalyst?.controlSearch?.handleSearchText,
      getOptionLabel: (option) => `${option?.firstName} ${option?.lastName ?? ''}`,
      isLoading: lovAnalyst?.isLoading,
    },
  ]
  return inputsFormRequestManagement
}
