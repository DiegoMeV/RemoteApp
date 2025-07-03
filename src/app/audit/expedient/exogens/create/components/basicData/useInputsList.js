import { useQueryDynamicApi } from '@/lib'

export const useInputsList = ({ modalRegisteredProcess, searchProcessType, form }) => {
  const { data: typeProcess, isFetching: loadingTypeProcess } = useQueryDynamicApi({
    url: searchProcessType?.searchText
      ? `/process-types?appIdentifier=FISCALIZACION&dataSourceType=EXTERNAL&searchString=${searchProcessType?.searchText}`
      : `/process-types?appIdentifier=FISCALIZACION&dataSourceType=EXTERNAL`,
    isCompanyRequest: true,
    baseKey: 'urlFiscalizacion',
  })

  const inputExogen = [
    {
      label: 'Consecutivo',
      name: 'identifier',
      type: 'text',
      disabled: true,
      space: 2,
    },
    {
      label: 'Estado',
      name: 'status',
      type: 'select',
      disabled: true,
      options: [
        { value: 'CREATED', label: 'Creado' },
        { value: 'PROGRESS', label: 'En progreso' },
        { value: 'FINISHED', label: 'Finalizado' },
      ],
      space: 4,
    },
    {
      label: 'Fecha de inicio',
      name: 'startDate',
      defaultValue: new Date(),
      type: 'date',
      space: 3,
    },
    {
      label: 'Fecha de finalización',
      name: 'endDate',
      type: 'date',
      space: 3,
      disabled: true,
    },
    {
      name: 'idProcessType',
      type: 'autocomplete',
      autocompleteProps: {
        options: typeProcess?.data ?? [],
        loadingOptions: loadingTypeProcess,
        openModal: () => modalRegisteredProcess.handleShow(),
        onChange: (e, value) => form.setValue('idProcessType', value?.id ?? null),
      },
      size: 'medium',
      required: true,
      textFieldProps: {
        label: 'Tipo de proceso',
        onChange: (e) => searchProcessType.handleSearchText(e.target.value),
      },
    },
    {
      label: 'Registros cargados',
      name: 'rowsCount',
      type: 'number',
      disabled: true,
      space: 3,
    },
    {
      label: 'Exp. generados',
      name: 'expedients',
      type: 'number',
      disabled: true,
      space: 3,
    },
    {
      label: 'Observaciones',
      name: 'observation',
      type: 'multiline',
      minRows: 3,
      space: 12,
    },
  ]
  const columnsProcessTypes = [
    {
      field: 'name',
      headerName: 'Nombre',
      width: 200,
    },
    {
      field: 'description',
      headerName: 'Descripción',
      width: 200,
    },
  ]
  const arrayModals = [
    {
      title: 'Tipo de proceso',
      openOptions: modalRegisteredProcess,
      rows: typeProcess?.data ?? [],
      columns: columnsProcessTypes,
      searchOptions: searchProcessType,
      //pagination: paginationOffices,
      loading: loadingTypeProcess,
      name: 'idProcessType',
    },
  ]
  return { inputExogen, arrayModals }
}
