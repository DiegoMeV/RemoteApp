import { additionalDataToComplainantOrAccusedForm, allDataComplainantOrAccused } from '../constants'

export const selectOptionsFamilyServices = (
  dependencies,
  processTypes,
  idProcessType,
  idProcess
) => {
  return [
    [
      {
        label: 'Seleccione una dependencia',
        name: 'office',
        type: 'autoCompleteSelect',
        data: dependencies,
        size: 'medium',
        required: true,
        disabled: idProcess ? true : false,
      },
      {
        label: 'Seleccione un proceso',
        name: 'typeProcess',
        type: 'autoCompleteSelect',
        data: processTypes?.data ?? [],
        defaultValue: processTypes?.data?.length === 1 ? processTypes?.data?.[0] : null,
        size: 'medium',
        required: true,
        disabled: idProcessType ? true : idProcess ? true : false,
        helperText: idProcessType ? 'No se puede cambiar el tipo de proceso' : '',
      },
    ],
    [
      {
        label: 'Fecha de registro',
        name: 'processData[additionalData].incidentDate',
        type: 'date',
        required: true,
        space: 4,
        disableFuture: true,
        disabled: idProcessType ? true : idProcess ? true : false,
        helperText: idProcessType ? 'Los datos hereados no se pueden cambiar' : '',
        validate: {
          custom: (value) => {
            if (value > new Date()) {
              return 'La fecha no puede ser mayor a la fecha actual'
            }
            return true
          },
        },
      },
      {
        label: 'Observaciones',
        name: 'processData[additionalData].incidentReporting',
        type: 'multiline',
        space: 12,
        required: true,
        disabled: idProcessType ? true : idProcess ? true : false,
        helperText: idProcessType ? 'Los datos hereados no se pueden cambiar' : '',
      },
    ],
    [],
    [],
    [],
  ]
}

export const tableOptionsObject = (complainants, setComplainants, accused, setAccused) => {
  return {
    complainant: {
      type: 'complainant',
      data: complainants,
      setData: setComplainants,
    },
    accused: {
      type: 'accused',
      data: accused,
      setData: setAccused,
    },
  }
}
export const transformObjectoToArrayForProcess = (data) => {
  return Object.keys(data).map((key) => {
    return {
      id: key,
      value: data[key] ?? '',
    }
  })
}
export const adaptDataForProcesss = (data) => {
  const adaptAdditionalData = transformObjectoToArrayForProcess(
    data?.processData?.additionalData || {}
  )
  const newData = {
    idOfficeOrigin: data?.office?.id,
    idProcessType: data?.typeProcess?.id,
    processData: { ...data.processData, additionalData: adaptAdditionalData },
  }
  return newData
}

export const optionsStepFive = (
  requestType,
  handleChangeTypeRequest,
  lawyersOptions,
  handleSetLawyer,
  processInfo
) => {
  const additionalData = processInfo?.processData?.additionalData

  const objectToValidations = Array.isArray(additionalData)
    ? additionalData?.reduce((acc, item) => {
        acc[item?.id] = item?.value
        return acc
      }, {})
    : additionalData ?? {}

  const { lawyers, searchLawyers, isLoading, isError, modalLawyers } = lawyersOptions
  if (requestType === 'remisiones' || requestType === 'legalConsultation') {
    return [
      {
        label: 'Tipo de solicitud',
        name: 'processData.additionalData.requestType',
        type: 'select',
        required: true,
        options: [
          { value: 'remisiones', label: 'Remisiones' },
          { value: 'legalConsultation', label: 'Consulta legal' },
          { value: 'consultancy', label: 'Asesoría' },
          { value: 'workshop', label: 'Taller' },
        ],
        space: 5,
        onChange: handleChangeTypeRequest,
        disabled: objectToValidations.requestType ? true : false,
        noDefaultValue: true,
      },
      {
        label: 'Asignar abogado',
        name: 'processData.additionalData.assignLawyer',
        type: 'autoCompleteSelect',
        space: 7,
        data: lawyers?.data ?? [],
        getOptionLabel: (option) =>
          option?.firstName
            ? `${option?.firstName ?? ''} ${option?.lastName ?? ''}`
            : option?.name ?? '',
        handleSearch: searchLawyers.handleSearchText,
        isLoading: isLoading,
        isError: isError,
        openModal: modalLawyers.handleShow,
        onChange: handleSetLawyer,
        disabled: objectToValidations.assignLawyer ? true : false,
        required: true,
      },
      {
        label: 'Observaciones',
        name: 'processData.additionalData.observation',
        type: 'multiline',
        space: 12,
        disabled: objectToValidations.assignLawyer ? true : false,
      },
    ]
  } else if (requestType === 'workshop') {
    return [
      {
        label: 'Tipo de solicitud',
        name: 'processData.additionalData.requestType',
        type: 'select',
        required: true,
        options: [
          { value: 'remisiones', label: 'Remisiones' },
          { value: 'legalConsultation', label: 'Consulta legal' },
          { value: 'consultancy', label: 'Asesoría' },
          { value: 'workshop', label: 'Taller' },
        ],
        space: 5,
        onChange: handleChangeTypeRequest,
        disabled: objectToValidations.requestType ? true : false,
        noDefaultValue: true,
      },
      {
        label: 'Tipo de taller',
        name: 'processData.additionalData.workshopType',
        type: 'select',
        required: true,
        noDefaultValue: true,
        disabled: objectToValidations.workshopType ? true : false,
        options: [
          {
            label: 'Beneficiarios de actividades de prevención de la explotación sexual',
            value: 'sexual_exploitation_prevention',
          },
          {
            label: 'Beneficiarios de actividades de prevención de la violencia intrafamiliar',
            value: 'domestic_violence_prevention',
          },
          {
            label: 'Beneficiarios de actividades de prevención de la violencia de género',
            value: 'gender_violence_prevention',
          },
          {
            label: 'Beneficiarios de actividades de prevención de la violencia sexual',
            value: 'sexual_violence_prevention',
          },
          {
            label:
              'Beneficiarios de actividades de prevención del maltrato hacia niños, niñas y adolescentes',
            value: 'child_abuse_prevention',
          },
        ],
        space: 12,
      },
      {
        label: 'Observaciones',
        name: 'processData.additionalData.observation',
        type: 'multiline',
        space: 12,
        disabled: objectToValidations.observation ? true : false,
      },
    ]
  }
  return [
    {
      label: 'Tipo de solicitud',
      name: 'processData.additionalData.requestType',
      type: 'select',
      required: true,
      options: [
        { value: 'remisiones', label: 'Remisiones' },
        { value: 'legalConsultation', label: 'Consulta legal' },
        { value: 'consultancy', label: 'Asesoría' },
        { value: 'workshop', label: 'Taller' },
      ],
      space: 12,
      onChange: handleChangeTypeRequest,
      disabled: objectToValidations.requestType ? true : false,
    },
    {
      label: 'Observaciones',
      name: 'processData.additionalData.observation',
      type: 'multiline',
      space: 12,
      disabled: objectToValidations.observation ? true : false,
    },
  ]
}

export const columnsLawyers = [
  {
    field: 'firstName',
    headerName: 'Nombre',
    minWidth: 250,
  },
  {
    field: 'lastName',
    headerName: 'Apellido',
    minWidth: 250,
  },
]

export const setActor = (
  response,
  formModal,
  getEducationLevelById,
  getProvinceById,
  getNeighborhoodsByID,
  searchCommune
) => {
  if (response?.data) {
    let value = {}

    const propertyActionsArray = {
      documentType: (item) =>
        (value = response?.data.find(
          (field) => field?.id === item?.name || field?.id === 'document_type'
        )),
      quality: () => {},
      documentNumber: (item) =>
        (value = response?.data.find(
          (field) => field?.id === item?.name || field?.id === 'identification'
        )),
      lastName: (item) =>
        (value = response?.data.find(
          (field) => field?.id === item?.name || field?.id === 'lastNameOne'
        )),
    }

    const propertyActions = {
      nivel_educativo: (value) => getEducationLevelById({ qry: `${value}?` }),
      barrio_vereda: (value) => getNeighborhoodsByID({ qry: `${value}` }),
      departamento_procedencia: (value) => getProvinceById({ qry: `${value}` }),
      comuna_corregimiento: (value) => searchCommune({ qry: `${value}` }),
      quality: () => {},
    }

    if (Array.isArray(response?.data)) {
      allDataComplainantOrAccused.forEach((item) => {
        const action =
          propertyActionsArray[item?.name] ||
          (() => (value = response?.data.find((field) => field?.id === item?.name)))

        action(item)

        formModal.setValue(item?.name, value?.value)
      })
      return
    } else {
      Object.entries(response?.data).forEach(([key, value]) => {
        if (value) {
          const action = propertyActions[key] || ((value) => formModal.setValue(key, value))
          action(value)
        }
      })
    }
  } else {
    additionalDataToComplainantOrAccusedForm({})?.map((item) => {
      formModal.setValue(item?.name, null)
    })
  }
}

export const convertDataForBody = (data) => {
  const {
    barrio_vereda,
    departamento_procedencia,
    nivel_educativo,
    comuna_corregimiento,
    ...completeData
  } = data
  return {
    ...completeData,
    nivel_educativo: nivel_educativo?.id ?? null,
    barrio_vereda: barrio_vereda?.id ?? null,
    comuna_corregimiento: comuna_corregimiento?.id ?? null,
    departamento_procedencia: departamento_procedencia?.id ?? null,
  }
}
