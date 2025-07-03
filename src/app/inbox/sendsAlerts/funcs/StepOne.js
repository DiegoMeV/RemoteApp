export const inputsStepOne = ({
  modalDependencies,
  dependencies,
  modalRegisteredProcess,
  processTypesFiltered,
  searchProcessType,
  loadingProcessTypes,
  alertModels,
  loadingAlertModels,
  modalAlertsModels,
  searchAlertsModel,
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
  {
    name: 'additionalData.modelFilter',
    type: 'autocomplete',
    autocompleteProps: {
      options: alertModels?.data ?? [],
      loadingOptions: loadingAlertModels,
      openModal: () => modalAlertsModels.handleShow(),
    },
    textFieldProps: {
      label: 'Modelo de alertas',
      onChange: (e) => searchAlertsModel.handleSearchText(e.target.value),
    },
  },
  {
    name: 'additionalData.month',
    label: 'Mes de aprobación comité técnico',
    type: 'select',
    options: [
      { value: '1', label: 'Enero' },
      { value: '2', label: 'Febrero' },
      { value: '3', label: 'Marzo' },
      { value: '4', label: 'Abril' },
      { value: '5', label: 'Mayo' },
      { value: '6', label: 'Junio' },
      { value: '7', label: 'Julio' },
      { value: '8', label: 'Agosto' },
      { value: '9', label: 'Septiembre' },
      { value: '10', label: 'Octubre' },
      { value: '11', label: 'Noviembre' },
      { value: '12', label: 'Diciembre' },
    ],
  },
]

export const editionProccessBody = (SIGEDOC) => {
  // Create obj to send additionalData
  const processData = {
    additionalData: [],
  }

  // Include SIGEDOC properties only if SIGEDOC exists
  if (SIGEDOC) {
    processData.additionalData.push(
      { id: 'SIGEDOCfechaRadicacion', value: SIGEDOC.fechaCreacion },
      { id: 'SIGEDOCcodigoDeSeguimiento', value: SIGEDOC.idDocumento.id },
      { id: 'archivo', value: SIGEDOC.archivo.binarioCodificado }
    )
  }

  // Construct the requirements body
  return {
    processData,
  }
}
