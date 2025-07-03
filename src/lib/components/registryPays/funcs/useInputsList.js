import { useQueryDynamicApi } from '@/lib'
import { useStoreState } from 'easy-peasy'
import { columnsDependencies, columnsProcessTypes } from '../constants'

export const useInputsList = (
  modalDependencies,
  modalRegisteredProcess,
  searchProcessType,
  idGroup,
  hierarchies
) => {
  const { dependencies } = useStoreState((state) => state.user.userData) || []
  const { data: typeProcess, isFetching: loadingTypeProcess } = useQueryDynamicApi({
    url: `/process-types?idGroup=${idGroup}&checkUserAccess=true`,
    isCompanyRequest: true,
    baseKey: 'urlProcess',
  })
  const inputsList = [
    {
      name: 'office',
      type: 'autocomplete',
      autocompleteProps: {
        options: hierarchies ?? dependencies,
        openModal: () => modalDependencies.handleShow(),
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
      },
      defaultValue: typeProcess?.data?.length === 1 ? typeProcess?.data[0] : null,
      size: 'medium',
      required: true,
      textFieldProps: {
        label: 'Tipo de proceso',
        onChange: (e) => searchProcessType.handleSearchText(e.target.value),
      },
    },
  ]
  const arrayModals = [
    {
      title: 'Dependencia',
      openOptions: modalDependencies,
      rows: hierarchies ?? dependencies ?? [],
      columns: columnsDependencies,
      //searchOptions: searchJobTitleVL,
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
  return { inputsList, arrayModals }
}
