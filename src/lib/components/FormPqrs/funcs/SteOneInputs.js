import {
  columnsDependencies,
  columnsProcessTypes,
} from '@/app/inbox/sendsAlerts/funcs/ValueListColumns'

export const inputsStepOne = ({
  dependencies,
  processTypesFiltered,
  loadingProcessTypes,
  searchProcessType,
  modalRegisteredProcess,
  modalDependencies,
}) => [
  {
    name: 'office',
    type: 'autocomplete',
    autocompleteProps: {
      options: dependencies,
      openModal: () => modalDependencies.handleShow(),
    },
    defaultValue: dependencies.length === 1 ? dependencies[0] : null,
    textFieldProps: {
      label: 'Dependencia',
    },
    size: 'medium',
    required: true,
    // disabled: idProcess ? true : false,
  },
  {
    name: 'typeProcess',
    type: 'autocomplete',
    autocompleteProps: {
      options: processTypesFiltered ?? [],
      loadingOptions: loadingProcessTypes,
      openModal: () => modalRegisteredProcess.handleShow(),
    },
    defaultValue: processTypesFiltered?.length === 1 ? processTypesFiltered?.[0] : null,
    size: 'medium',
    required: true,
    textFieldProps: {
      label: 'Tipo de proceso',
      onChange: (e) => searchProcessType.handleSearchText(e.target.value),
    },
    // disabled: idProcessType ? true : idProcess ? true : false,
    // helperText: idProcessType ? 'No se puede cambiar el tipo de proceso' : '',
  },
]

export const buildArrayOfModals = ({
  modalDependencies,
  dependencies,
  modalRegisteredProcess,
  processTypesFiltered,
  searchProcessType,
  loadingProcessTypes,
}) => {
  return [
    {
      title: 'Dependencia',
      openOptions: modalDependencies,
      rows: dependencies ?? [],
      columns: columnsDependencies,
      //searchOptions: searchJobTitleVL,
      //pagination: paginationJobTitles,
      name: 'office',
    },
    {
      title: 'Tipo de proceso',
      openOptions: modalRegisteredProcess,
      rows: processTypesFiltered ?? [],
      columns: columnsProcessTypes,
      searchOptions: searchProcessType,
      //pagination: paginationOffices,
      loading: loadingProcessTypes,
      name: 'typeProcess',
    },
  ]
}
