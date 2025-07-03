import { useBoolean, useQueryDynamicApi, useSearch } from '@/lib'

export const useReceptionInputs = ({ form }) => {
  const modalDeps = useBoolean()
  const modalCities = useBoolean()
  const searchDepsVL = useSearch()
  const searchCitiesVL = useSearch()
  const {
    data: deps,
    isLoading: loadingDep,
    error: errorDeps,
  } = useQueryDynamicApi({
    url: searchDepsVL?.searchText
      ? `/common-data/DEPARTAMENTOS?name=${searchDepsVL?.searchText}`
      : '/common-data/DEPARTAMENTOS/',
    baseKey: 'urlApps',
  })
  const {
    data: cities,
    isLoading: loadingCity,
    error: errorCities,
  } = useQueryDynamicApi({
    url: `/common-data/MUNICIPIOS?idParent=${form.getValues('receptionInfo.receptionDepartment')}`,
    baseKey: 'urlApps',
    enabled: !!form.getValues('receptionInfo.receptionDepartment'),
  })

  const errorLovs = errorDeps?.message || errorCities?.message || null
  const receptionData = [
    {
      name: 'receptionInfo.receptionType',
      label: 'Seleccione de que manera desea recibir la respuesta',
      classNameLabel: 'col-span-12 text-[20px] font-bold',
      type: 'radioSelect',
      required: true,
      className: '!col-span-12 gap-4 mt-4',
      options: [
        {
          value: 'email',
          label: 'Correo electrónico',
          className: 'sm:w-full md:w-[420px] self-center',
        },
        {
          value: 'mensajeria',
          label: 'Mensajería',
          className: 'sm:w-full md:w-[420px] self-center',
        },
        {
          value: 'portal',
          label: 'Publicado en portal web',
          className: 'sm:w-full md:w-[420px] self-center',
        },
      ],
    },
    ...(form.watch('receptionInfo.receptionType') === 'email'
      ? [
          {
            label: 'email',
            name: 'receptionInfo.receptionEmail',
            type: 'email',
            required: true,
            className: 'col-span-12',
          },
        ]
      : []),
    ...(form.watch('receptionInfo.receptionType') === 'mensajeria'
      ? [
          {
            label: 'Dirección',
            name: 'receptionInfo.receptionAddress',
            type: 'text',
            required: true,
            className: 'general_form_item',
          },
          {
            type: 'autocomplete',
            name: 'receptionInfo.receptionDepartment',
            label: 'Departamento',
            disabled: form.watch('receptionInfo.receptionDepartment') && loadingDep,
            onChange: (_, newValue) => {
              form.setValue('receptionInfo.receptionDepartment', newValue.id)
              form.setValue('receptionInfo.city', null)
            },
            autocompleteprops: {
              options: deps?.data ?? [],
              openmodal: () => modalDeps.handleShow(),
              loadingoptions: loadingDep,
            },
            className: 'general_form_item',
          },
          {
            type: 'autocomplete',
            name: 'receptionInfo.receptionCity',
            label: 'Ciudad',
            disabled:
              !form.watch('receptionInfo.receptionDepartment') ||
              (form.watch('receptionInfo.receptionCity') && loadingCity),
            onChange: (_, newValue) => {
              form.setValue('receptionInfo.receptionCity', newValue.id)
            },
            autocompleteprops: {
              options: cities?.data ?? [],
              openmodal: () => modalCities.handleShow(),
              loadingoptions: loadingCity,
            },
            className: 'general_form_item',
          },
          {
            label: 'Código Postal',
            name: 'receptionInfo.receptionPostalCode',
            type: 'text',
            required: true,
            className: 'general_form_item',
          },
        ]
      : []),
  ]
  const arrayModals = [
    {
      title: 'Departamentos',
      openOptions: modalDeps,
      rows: deps?.data ?? [],
      columns: [{ field: 'name', headerName: 'Nombre' }],
      searchOptions: searchDepsVL,
      loading: loadingDep,
      //pagination: paginationJobTitles,
      name: 'receptionInfo.department',
    },
    {
      title: 'Municipios',
      openOptions: modalCities,
      rows: cities?.data ?? [],
      columns: [{ field: 'name', headerName: 'Nombre' }],
      searchOptions: searchCitiesVL,
      //pagination: paginationOffices,
      loading: loadingCity,
      name: 'receptionInfo.municipality',
    },
  ]
  return { receptionData, errorLovs, arrayModals }
}
