import { useBoolean, useQueryDynamicApi, useSearch } from '@/lib'
import { RenderGroupTask, RenderOptionTask } from './components'

export const useInputsList = ({ form }) => {
  const modalRegisteredProcess = useBoolean()
  const modalRegisteredTask = useBoolean()
  const modalRegisteredDocument = useBoolean()
  const searchProcessType = useSearch()
  const searchTask = useSearch()
  const searchDocument = useSearch()

  const { data: typeProcess, isFetching: loadingTypeProcess } = useQueryDynamicApi({
    url: searchProcessType?.searchText
      ? `/process-types?appIdentifier=FISCALIZACION&searchString=${searchProcessType.searchText}`
      : `/process-types?appIdentifier=FISCALIZACION`,
    isCompanyRequest: true,
    baseKey: 'urlFiscalizacion',
  })

  const { data: activities, isFetching: loadingActivities } = useQueryDynamicApi({
    url: `/process-types/${form.watch('idProcessType')}/util/all-activities`,
    isCompanyRequest: true,
    enabled: !!form.watch('idProcessType'),
    baseKey: 'urlFiscalizacion',
  })

  const { data: activityActionsItems, isFetching: loadingActivityActionsItem } = useQueryDynamicApi(
    {
      url: `/process-types/${form.watch(
        'idProcessType'
      )}/util/resources/documents?idTask=${form.watch('idTask')}`,
      enabled: !!form.watch('idTask') && !!form.watch('idProcessType'),
      isCompanyRequest: true,
      baseKey: 'urlFiscalizacion',
    }
  )

  const inputsMassiveActivities = [
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
        { value: 'NEW', label: 'Nueva' },
        { value: 'APPLIED', label: 'Aplicada' },
      ],
      space: 4,
    },
    {
      label: 'Fecha de inicio',
      name: 'createdAt',
      disabled: true,
      type: 'date',
      space: 3,
    },
    {
      label: 'Acción',
      name: 'action',
      type: 'select',
      required: true,
      options: [
        { value: 'APPLY_ACTIVITY', label: 'Solo aplicar actividad' },
        { value: 'GENERATE_DOCUMENT', label: 'Generar documento' },
        { value: 'GENERATE_CONSECUTIVE', label: 'Generar consecutivo' },
        { value: 'UPLOAD_FILE', label: 'Carga archivo anexo' },
        { value: 'GENERATE_CONSOLIDATED_DOCUMENT', label: 'Generar documento consolidado' },
      ],
      space: 3,
    },
    {
      name: 'idProcessType',
      type: 'autocomplete',
      autocompleteProps: {
        options: typeProcess?.data ?? [],
        loadingOptions: loadingTypeProcess,
        openModal: () => modalRegisteredProcess.handleShow(),
        onChange: (e, value) => {
          form.setValue('idProcessType', value?.id ?? null)
          form.setValue('idTask', null)
          form.setValue('idProcessTaskActionItems', null)
        },
      },
      size: 'medium',
      required: true,
      textFieldProps: {
        label: 'Tipo de proceso',
        onChange: (e) => searchProcessType.handleSearchText(e.target.value),
      },
      space: 9,
    },
    {
      label: 'Cantidad de expedientes',
      name: 'rowsCount',
      type: 'number',
      disabled: true,
      space: 3,
    },
    {
      name: 'idTask',
      type: 'autocomplete',
      autocompleteProps: {
        options: activities?.data ?? [],
        loadingOptions: loadingActivities,
        openModal: () => modalRegisteredTask.handleShow(),
        onChange: (e, value) => {
          form.setValue('idTask', value?.id ?? null)
          form.setValue('idProcessTaskActionItems', null)
        },
        disabled: !form.watch('idProcessType'),
      },
      textFieldProps: {
        label: 'Actividad',
        onChange: (e) => searchProcessType.handleSearchText(e.target.value),
      },
      space: 6,
      size: 'medium',
      required: true,
      disabled: !form.watch('idProcessType'),
      groupBy: () => 'All Options',
      getOptionLabel: (options) => options?.name,
      renderGroup: (params) => <RenderGroupTask params={params} />,
      renderOption: (props, option) => {
        return (
          <RenderOptionTask
            props={props}
            option={option}
          />
        )
      },
    },
    {
      name: 'idProcessTaskActionItems',
      type: 'autocomplete',
      autocompleteProps: {
        options: activityActionsItems?.data ?? [],
        loadingOptions: loadingActivityActionsItem,
        openModal: () => modalRegisteredDocument.handleShow(),
        onChange: (e, value) => form.setValue('idProcessTaskActionItems', value?.id ?? null),
        disabled: !form.watch('idTask'),
      },
      textFieldProps: {
        label: 'Documentos',
        onChange: (e) => searchProcessType.handleSearchText(e.target.value),
      },
      space: 6,
      size: 'medium',
      disabled: !form.watch('idTask'),
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
  const columnsTask = [
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
    {
      field: 'ParentTask',
      headerName: 'Etapa',
      width: 200,
      valueGetter: (params) => `${params.row?.ParentTask?.name}`,
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
    {
      title: 'Actividades',
      openOptions: modalRegisteredTask,
      rows: activities?.data ?? [],
      columns: columnsTask,
      searchOptions: searchTask,
      //pagination: paginationOffices,
      loading: loadingActivities,
      name: 'idTask',
    },
    {
      title: 'Documentos',
      openOptions: modalRegisteredDocument,
      rows: activityActionsItems?.data ?? [],
      columns: columnsProcessTypes,
      searchOptions: searchDocument,
      //pagination: paginationOffices,
      loading: loadingActivityActionsItem,
      name: 'idProcessTaskActionItems',
    },
  ]
  return { inputsMassiveActivities, arrayModals }
}
