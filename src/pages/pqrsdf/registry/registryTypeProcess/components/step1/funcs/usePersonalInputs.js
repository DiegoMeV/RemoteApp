import { useQueryDynamicApi, useSearch } from '@/lib'
import { useBoolean, useMutationDynamicBaseUrl } from '@/libV4'
import { useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'

export const usePersonalInputs = ({ form }) => {
  const modalDeps = useBoolean()
  const modalCities = useBoolean()
  const searchDepsVL = useSearch()
  const searchCitiesVL = useSearch()
  const { token } = useStoreState((state) => state.token.tokenData || {})
  const {
    data: deps,
    isLoading: loadingDep,
    error: errorDeps,
  } = useQueryDynamicApi({
    url: searchDepsVL?.searchText
      ? `/common-data/DEPARTAMENTOS?name=${searchDepsVL?.searchText}`
      : '/common-data/DEPARTAMENTOS/',
    baseKey: 'urlApps',
    enabled: form.watch('personalData.country') === 'Colombia',
  })
  const {
    data: cities,
    isLoading: loadingCity,
    error: errorCities,
  } = useQueryDynamicApi({
    url: `/common-data/MUNICIPIOS?idParent=${form.getValues('personalData.department.id')}`,
    baseKey: 'urlApps',
    enabled: !!form.getValues('personalData.department.id'),
  })

  const loadingInputs = loadingDep || loadingCity
  const errorLovs = errorDeps?.message || errorCities?.message || null
  const { mutateAsync: searchActor, isPending: loadingActor } = useMutationDynamicBaseUrl({
    url: `/general/seek-actors`,
    baseKey: 'urlProcess',
    method: 'get',
    onSuccess: (response) => {
      Object.keys(response?.data).forEach((key) => {
        form.setValue(key, response?.data[key])
      })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? 'Error al buscar actor')
    },
  })
  const personalData = [
    {
      label: 'Tipo de solicitante',
      name: 'personalData.applicantType',
      type: 'select',
      required: true,
      options: [
        { value: 'Apoderado', label: 'Apoderado' },
        { value: 'NinosAdolescentes', label: 'Niño, niña, adolescente' },
        { value: 'Juridico', label: 'Persona jurídica' },
        { value: 'Natural', label: 'Persona natural' },
        { value: 'GFamiliar', label: 'Grupo familiar' },
      ],
      onChange: (event) => {
        if (event.target.value === 'Juridico') {
          form.setValue('personalData.documentType', 'NIT')
        }
        form.setValue('personalData.applicantType', event.target.value)
      },
      className: 'general_form_item',
      disabled: loadingActor,
    },
    {
      label: 'Tipo de documento',
      name: 'personalData.documentType',
      type: 'select',
      required: true,
      options: [
        { value: 'CC', label: 'Cédula de ciudadanía' },
        { value: 'CE', label: 'Cédula de extranjería' },
        { value: 'NIT', label: 'Número de identificación tributaria' },
        { value: 'NUI', label: 'Número único de identificación' },
        { value: 'NUIP', label: 'Número único de identificación personal' },
        { value: 'PAS', label: 'Pasaporte' },
        { value: 'PEP', label: 'Permiso especial de permanencia' },
        { value: 'PPT', label: 'Permiso por protección temporal' },
        { value: 'RC', label: 'Registro civil' },
        { value: 'TD', label: 'Tarjeta de diplomático' },
        { value: 'TI', label: 'Tarjeta de identidad' },
        { value: 'VISA', label: 'Visa' },
      ],
      className: 'general_form_item ',
      disabled: form.watch('personalData.applicantType') === 'Juridico' || loadingActor,
    },
    {
      label: 'Número de identificación',
      name: 'personalData.documentNumber',
      type: 'text',
      onBlur: async (event) => {
        if (!!event.target.value && event.target.value !== '') {
          if (token) {
            searchActor({
              qry: `?identification=${event.target.value}`,
            })
          }
        }
      },
      required: true,
      disabled: loadingActor,
      className: 'general_form_item',
    },
    ...(form.watch('personalData.applicantType') === 'Juridico'
      ? [
          {
            label: 'Nombre razón social',
            name: 'personalData.businessName',
            type: 'text',
            className: 'general_form_item',
            required: true,
            disabled: loadingActor,
          },
          {
            label: 'Tipo de documento del representante legal',
            name: 'personalData.legalRepresentativeDocumentType',
            type: 'select',
            required: true,
            options: [
              { value: 'CC', label: 'Cédula de ciudadanía' },
              { value: 'CE', label: 'Cédula de extranjería' },
            ],
            className: 'general_form_item',
            disabled: loadingActor,
          },
          {
            label: 'Número de documento del representante legal',
            name: 'personalData.legalRepresentativeDocumentNumber',
            type: 'text',
            required: true,
            className: 'general_form_item',
            disabled: loadingActor,
          },
        ]
      : []),
    {
      label:
        form?.watch('personalData.applicantType') === 'Juridico'
          ? 'Nombre completo del representante legal'
          : 'Nombre completo',
      name: 'personalData.fullName',
      type: 'text',
      required: true,
      className: 'general_form_item',
      disabled: loadingActor,
    },
    {
      label: 'País',
      name: 'personalData.country',
      type: 'select',
      disabled: loadingActor,
      options: [
        { value: 'Colombia', label: 'Colombia' },
        { value: 'Otro', label: 'Otro' },
      ],
      className: 'general_form_item',
    },
    ...(form.watch('personalData.country') === 'Colombia'
      ? [
          {
            type: 'autocomplete',
            name: 'personalData.department',
            label: 'Departamento',
            disabled: loadingActor,
            required: true,
            onChange: (_, newValue) => {
              form.setValue('personalData.department', newValue)
              form.setValue('personalData.municipality', null)
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
            name: 'personalData.municipality',
            label: 'Ciudad',
            required: true,
            disabled: loadingActor || !form.watch('personalData.department'),
            autocompleteprops: {
              options: cities?.data ?? [],
              openmodal: () => modalCities.handleShow(),
              loadingoptions: loadingCity,
            },
            className: 'general_form_item',
          },
        ]
      : []),
    {
      label: 'Número de teléfono',
      name: 'personalData.phoneNumber',
      type: 'text',
      disabled: loadingActor,
      className: 'general_form_item',
    },
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
      name: 'personalData.department',
    },
    {
      title: 'Municipios',
      openOptions: modalCities,
      rows: cities?.data ?? [],
      columns: [{ field: 'name', headerName: 'Nombre' }],
      searchOptions: searchCitiesVL,
      //pagination: paginationOffices,
      loading: loadingCity,
      name: 'personalData.municipality',
    },
  ]
  return { personalData, loadingInputs, errorLovs, arrayModals }
}

export const typeSelector = [
  { value: 'N', label: 'Personal', className: 'general_form_item' },
  { value: 'Y', label: 'Anónimo', className: 'general_form_item' },
]
