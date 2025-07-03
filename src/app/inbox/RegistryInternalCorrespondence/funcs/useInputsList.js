import { useQueryDynamicApi } from '@/lib'
import { useStoreState } from 'easy-peasy'
import { columnsDependencies, columnsProcessTypes } from '../constants'

export const useInputsList = (
  modalDependencies,
  modalRegisteredProcess,
  searchProcessType,
  searchJobTitleVL,
  idGroup,
  hierarchies,
  idProcessType
) => {
  const { dependencies } = useStoreState((state) => state.user.userData) || []
  const { data: typeProcess, isFetching: loadingTypeProcess } = useQueryDynamicApi({
    url: `/process-types?idGroup=${idGroup}&checkUserAccess=true`,
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    enabled: !!idGroup,
  })
  const checkList = [
    {
      type: 'checkbox',
      name: 'cds',
      label: 'CDs/DVDs',
      space: 12,
    },
    {
      type: 'checkbox',
      name: 'usbStorage',
      label: 'Dispositivos de almacenamiento USB',
      space: 12,
    },
    {
      type: 'checkbox',
      name: 'magazinesBooks',
      label: 'Revistas/Libros',
      space: 12,
    },
    {
      type: 'checkbox',
      name: 'plans',
      label: 'Planos',
      space: 12,
    },
    {
      type: 'checkbox',
      name: 'folios',
      label: 'Folios',
      space: 12,
    },
  ]
  const inputsList = [
    {
      name: 'registryNumber',
      type: 'text',
      space: 8,
      label: 'Número de consecutivo',
      disabled: true,
      validate: () => {
        return true
      },
    },
    {
      name: 'RegistryDate',
      type: 'date',
      space: 4,
      label: 'Fecha de radicación',
      disabled: true,
    },
    {
      name: 'office',
      type: 'autocomplete',
      autocompleteProps: {
        options: hierarchies ?? dependencies,
        openModal: () => modalDependencies.handleShow(),
        disabled: !idGroup,
      },
      defaultValue: dependencies.length === 1 ? dependencies[0] : null,
      textFieldProps: {
        label: 'Dependencia',
      },
      size: 'medium',
      required: true,
    },
    {
      name: 'typeProcess',
      type: 'autocomplete',
      autocompleteProps: {
        options: typeProcess?.data ?? [],
        loadingOptions: loadingTypeProcess,
        openModal: () => modalRegisteredProcess.handleShow(),
        disabled: !idGroup || idProcessType,
      },
      defaultValue: idProcessType
        ? idProcessType
        : typeProcess?.data?.length === 1
        ? typeProcess?.data[0]
        : null,
      size: 'medium',
      required: true,
      textFieldProps: {
        label: 'Tipo de proceso',
        onChange: (e) => searchProcessType.handleSearchText(e.target.value),
      },
    },
    {
      name: 'subject',
      label: 'Asunto',
      type: 'multiline',
      space: 12,
      multiline: true,
      minRows: 3,
    },
  ]

  const arrayModals = [
    {
      title: 'Dependencia',
      openOptions: modalDependencies,
      rows: hierarchies ?? dependencies ?? [],
      columns: columnsDependencies,
      searchOptions: searchJobTitleVL,
      //pagination: paginationJobTitles,
      name: 'office',
    },
    {
      title: 'Tipo de proceso',
      openOptions: modalRegisteredProcess,
      rows: typeProcess?.data ?? [],
      columns: columnsProcessTypes,
      searchOptions: searchProcessType,
      //pagination: paginationOffices,
      loading: loadingTypeProcess,
      name: 'typeProcess',
    },
  ]
  return { inputsList, arrayModals, checkList }
}
