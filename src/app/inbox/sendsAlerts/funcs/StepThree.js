export const inputsStepThree = ({
  series,
  loadingSeries,
  modalSeries,
  carpetas,
  loadingCarpetas,
  modalCarpetas,
  tipoDocumentales,
  loadingTipoDocumentales,
  modalTipoDocumentales,
  tipoDocumento,
  loadingTipoDocumento,
  modalTipoDocumento,
  usuarioDestino,
  loadingUsuarioDestino,
  modalUsuarioDestino,

  officesDestination,
  loadingOfficesDestination,
  modalOfficesDestination,
  searchDestinyOffice,
}) => [
  {
    name: 'serie',
    type: 'autocomplete',
    autocompleteProps: {
      options: series?.data ?? [],
      loadingOptions: loadingSeries,
      openModal: () => modalSeries.handleShow(),
    },
    defaultValue: series?.data?.length === 1 ? series?.data?.[0] : null,
    size: 'medium',
    required: true,
    textFieldProps: {
      label: 'Serie',
    },
    // disabled: idProcessType ? true : idProcess ? true : false,
    // helperText: idProcessType ? 'No se puede cambiar el tipo de proceso' : '',
  },

  {
    name: 'carpeta',
    type: 'autocomplete',
    autocompleteProps: {
      options: carpetas ?? [],
      loadingOptions: loadingCarpetas ?? null,
      openModal: () => modalCarpetas?.handleShow(),
    },
    textFieldProps: {
      label: 'Expediente',
    },
  },
  {
    name: 'tipoDocumentales',
    type: 'autocomplete',
    autocompleteProps: {
      options: tipoDocumentales?.data ?? [],
      loadingOptions: loadingTipoDocumentales ?? null,
      openModal: () => modalTipoDocumentales.handleShow(),
    },
    textFieldProps: {
      label: 'Tipo documental',
    },
  },
  {
    name: 'tipoDocumento',
    type: 'autocomplete',
    autocompleteProps: {
      options: tipoDocumento?.data ?? [],
      loadingOptions: loadingTipoDocumento ?? null,
      openModal: () => modalTipoDocumento.handleShow(),
    },
    textFieldProps: {
      label: 'Tipo documento',
    },
  },
  {
    name: 'additionalData.officeDestination',
    type: 'autocomplete',
    autocompleteProps: {
      options: officesDestination?.data ?? [],
      loadingOptions: loadingOfficesDestination,
      openModal: () => modalOfficesDestination.handleShow(),
    },
    textFieldProps: {
      label: 'Dependencia de destino',
      onChange: (e) => searchDestinyOffice.handleSearchText(e.target.value),
    },
  },
  {
    name: 'usuarioDestino',
    type: 'autocomplete',
    autocompleteProps: {
      options: usuarioDestino?.data ?? [],
      loadingOptions: loadingUsuarioDestino ?? null,
      openModal: () => modalUsuarioDestino.handleShow(),
      getOptionLabel: (option) => `${option?.nombre ?? ''} ${option?.apellidos ?? ''}`,
    },
    textFieldProps: {
      label: 'Usuario destino',
    },
  },
]

export const extractIdDigitalFiles = (arr) => {
  return arr?.map((file) => {
    if (file?.archivoProceso) return { ...file }
    const fileProcess = { ...file }
    delete fileProcess.id
    return { ...fileProcess }
  })
}
