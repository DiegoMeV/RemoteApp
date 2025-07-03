import { useBoolean, useQueryDynamicApi, useSearch } from '@/lib'

export const useInputsCreateThird = ({ copy, formModal, searchActor, loadingActor }) => {
  const modalDeps = useBoolean()
  const modalCities = useBoolean()
  const searchDepsVL = useSearch()
  const searchCitiesVL = useSearch()
  const onBlurIdentification = async (event) => {
    if (!!event.target.value && event.target.value !== '') {
      searchActor({
        qry: `?identification=${event.target.value}`,
      })
    }
  }
  const {
    data: deps,
    isLoading: loadingDep,
    isError: errorDeps,
  } = useQueryDynamicApi({
    url: searchDepsVL?.searchText
      ? `/common-data/DEPARTAMENTOS?name=${searchDepsVL?.searchText}`
      : '/common-data/DEPARTAMENTOS/',
    baseKey: 'urlApps',
  })
  const {
    data: cities,
    isLoading: loadingCity,
    isError: errorCities,
  } = useQueryDynamicApi({
    url: `/common-data/MUNICIPIOS?idParent=${formModal.getValues('department.id')}`,
    baseKey: 'urlApps',
    enabled: !!formModal.getValues('department.id'),
  })

  const loadingInputs = loadingDep || loadingCity
  const errorLovs = errorDeps || errorCities
  const inputs = [
    {
      type: 'text',
      name: 'identification',
      label: 'Identificación',
      className: 'general_form_item md:col-span-4',
      onBlur: onBlurIdentification,
      disabled: loadingActor,
    },
    {
      type: 'select',
      name: 'typeDocument',
      label: 'Tipo de documento',
      disabled: loadingActor,
      className: 'general_form_item md:col-span-4',
      options: [
        { value: 'desconocido', label: 'Desconocido' },
        { value: 'CC', label: 'Cédula de Ciudadanía' },
        { value: 'TI', label: 'Tarjeta de Identidad' },
        { value: 'menor_sin_identificacion', label: 'Menor sin Identificación' },
        { value: 'CE', label: 'Cédula de Extranjería' },
        { value: 'extranjero_indocumentado', label: 'Extranjero Indocumentado' },
        { value: 'RC', label: 'Registro Civil' },
        { value: 'certificado_nacido_vivo', label: 'Certificado Nacido Vivo' },
        { value: 'adulto_sin_identificacion', label: 'Adulto sin Identificación' },
        { value: 'PA', label: 'Pasaporte' },
        { value: 'PEP', label: 'Permiso de Ingreso y Permanencia' },
        { value: 'PPT', label: 'Permiso de Protección Temporal' },
      ],
    },
    {
      type: 'select',
      name: 'prefixes',
      label: 'Tipo de saludo',
      disabled: loadingActor,
      className: 'general_form_item md:col-span-4',
      defaultValue: '',
      options: [
        { label: 'Seleccione...', value: '' },
        { label: 'Sr(a).', value: 'Sr(a).' },
        { label: 'Señor(a).', value: 'Señor(a).' },
        { label: 'Sr.', value: 'Sr.' },
        { label: 'Señor.', value: 'Señor.' },
        { label: 'Sra.', value: 'Sra.' },
        { label: 'Señora.', value: 'Señora.' },
        { label: 'Sres.', value: 'Sres.' },
        { label: 'Señores.', value: 'Señores.' },
        { label: 'Dr.', value: 'Dr.' },
        { label: 'Doctor.', value: 'Doctor.' },
        { label: 'Dra.', value: 'Dra.' },
        { label: 'Doctora.', value: 'Doctora.' },
        { label: 'Ing.', value: 'Ing.' },
        { label: 'Ingeniero(a).', value: 'Ingeniero(a).' },
        { label: 'Arq.', value: 'Arq.' },
        { label: 'Arquitecto(a).', value: 'Arquitecto(a).' },
      ],
    },
    {
      type: 'text',
      name: 'firstLastname',
      label: 'Primer apellido',
      disabled: loadingActor,
      className: 'general_form_item md:col-span-4',
    },
    {
      type: 'text',
      name: 'secondLastname',
      label: 'Segundo apellido',
      className: 'general_form_item md:col-span-4',
      disabled: loadingActor,
    },
    {
      type: 'text',
      name: 'name',
      label: 'Nombre / Razón social',
      className: 'general_form_item md:col-span-4',
      disabled: loadingActor,
    },
    {
      type: 'text',
      name: 'sentTo',
      label: 'Dirección de notificación',
      className: 'general_form_item md:col-span-4',
      disabled: loadingActor,
    },
    {
      type: 'text',
      name: 'phone',
      label: 'Teléfono fijo',
      className: 'general_form_item md:col-span-4',
      disabled: loadingActor,
    },
    {
      type: 'text',
      name: 'cellphone',
      label: 'Número de celular',
      className: 'general_form_item md:col-span-4',
      disabled: loadingActor,
    },
    {
      type: 'autocomplete',
      name: 'department',
      label: 'Departamento',
      disabled: loadingActor,
      required: true,
      onChange: (_, newValue) => {
        formModal.setValue('department', newValue)
        formModal.setValue('city', null)
      },
      autocompleteprops: {
        options: deps?.data ?? [],
        openmodal: () => modalDeps.handleShow(),
        loadingoptions: loadingDep,
      },
      className: 'general_form_item md:col-span-4',
    },
    {
      type: 'autocomplete',
      name: 'city',
      label: 'Ciudad',
      required: true,
      disabled: loadingActor || !formModal.watch('department'),
      autocompleteprops: {
        options: cities?.data ?? [],
        openmodal: () => modalCities.handleShow(),
        loadingoptions: loadingCity,
      },
      className: 'general_form_item md:col-span-4',
    },
    {
      type: 'text',
      name: 'jobTitle',
      label: 'Cargo',
      className: 'general_form_item md:col-span-4',
      disabled: loadingActor,
    },
    {
      type: 'text',
      name: 'entity',
      label: 'Entidad',
      className: 'general_form_item md:col-span-6',
      disabled: loadingActor,
    },
    {
      type: 'email',
      name: 'email',
      label: 'Correo electrónico',
      className: 'general_form_item md:col-span-6',
      disabled: loadingActor,
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
      name: 'department',
    },
    {
      title: 'Municipios',
      openOptions: modalCities,
      rows: cities?.data ?? [],
      columns: [{ field: 'name', headerName: 'Nombre' }],
      searchOptions: searchCitiesVL,
      //pagination: paginationOffices,
      loading: loadingCity,
      name: 'city',
    },
  ]
  if (copy) {
    inputs.push({
      type: 'checkbox',
      name: 'copy',
      label: 'Copia',
      space: 1,
    })
  }
  return { inputs, loadingInputs, arrayModals, errorLovs }
}
