import { formatToLocaleDate } from '@/lib'

export const structGroup = (groups, setOptions) => {
  if (groups?.data?.length !== 0) {
    const completeInfo = groups?.data?.map((app) => {
      return app?.groups?.map((group) => {
        return {
          ...group,
          parentName: app.name,
          parentId: app.id,
        }
      })
    })
    const dataGroupStruct = completeInfo?.reduce((acum, element) => acum.concat(element), [])
    setOptions(dataGroupStruct)
  }
}

export const handleNextStep = (setStep) => {
  setStep((prev) => prev + 1)
}

export const formatDate = (date) => {
  if (!date) return ''

  const fecha = new Date(date)

  const year = fecha.getFullYear()
  const month = String(fecha.getMonth() + 1).padStart(2, '0')
  const day = String(fecha.getDate()).padStart(2, '0')
  const hours = String(fecha.getHours()).padStart(2, '0')
  const minutes = String(fecha.getMinutes()).padStart(2, '0')

  const dateFormatted = `${year}-${month}-${day}T${hours}:${minutes}`

  return dateFormatted
}

export const handleSelect = (newValue, name, setValue) => {
  setValue(name, newValue)
}

const validateParameters = (stepSelect, stepBasic) => {
  // Parameter validation
  if (!stepSelect || !stepBasic) {
    throw new Error('Valores inválidos')
  }

  // Property existence checks
  if (!stepSelect.dependency || !stepSelect.processType) {
    throw new Error('Faltan propiedades obligatorias en el paso selección de proceso')
  }
}

export const requirementsBody = (stepSelect, stepBasic /*todo: SIGEDOC*/) => {
  // Validate parameters
  validateParameters(stepSelect, stepBasic)

  // Create obj to send additionalData
  const keys = [
    'descripcionTipoSolicitud',
    'usoInformacion',
    'descripcionSolicitud',
    'tipoSolicitud',
    'detalleUsoInfo',
    'vigenciaConsulta',
  ]

  const additionalData = keys.reduce((acc, key) => {
    let value = stepBasic?.[key] ?? ''

    if (key === 'usoInformacion' && typeof value === 'object' && value !== null) {
      value = value.id ?? ''
    }

    acc[key === 'usoInformacion' ? 'idUsoInfo' : key] = value
    return acc
  }, {})

  // Construct the requirements body
  return {
    idParentProcess: stepSelect?.relatedRequirements?.id ?? null,
    idOfficeOrigin: stepSelect?.dependency?.id ?? null,
    idProcessType: stepSelect?.processType?.id ?? null,
    description: stepSelect?.description ?? '',
    processData: { additionalData },
  }
}

export const summaryCardSelect = (stepSelect) => {
  return [
    { label: 'Tipo de proceso:', value: stepSelect?.processType?.name ?? '' },
    { label: 'Dependencia:', value: stepSelect?.dependency?.name ?? '' },
    { label: 'Descripción:', value: stepSelect?.description ?? '' },
  ]
}

export const relatedRequirementsSigedoc = (infoProcess) => {
  const sigedocTypeProcessOrigin = infoProcess?.relatedRequirements?.processData?.additionalData
  return [
    {
      label: 'Fecha radicación origen:',
      value: formatToLocaleDate(sigedocTypeProcessOrigin?.SIGEDOCfechaRadicacion ?? ''),
    },
    {
      label: 'Sigedoc asociado:',
      value: sigedocTypeProcessOrigin?.SIGEDOCcodigoDeSeguimiento ?? '',
    },
  ]
}

export const summaryCardProcessTypeOrigin = (stepSelect) => {
  const sigedoc = relatedRequirementsSigedoc(stepSelect) ?? []

  return [
    {
      label: 'Tipo de proceso origen:',
      value: stepSelect?.relatedRequirements?.ProcessType?.name ?? '',
    },
    ...sigedoc,
    { label: 'Identificador origen:', value: stepSelect?.relatedRequirements?.identifier ?? null },
  ]
}

export const summaryCardBasic = (stepBasic) => {
  return [
    { label: 'Vigencia consulta: ', value: stepBasic?.vigenciaConsulta ?? '' },
    { label: 'Tipo de solicitud:', value: stepBasic?.tipoSolicitud ?? '' },
    { label: 'Uso de la información:', value: stepBasic?.usoInformacion?.nombre ?? '' },
    { label: 'Descripción de la solicitud:', value: stepBasic?.descripcionSolicitud ?? '' },
  ]
}

export const bodyGenerateSIGEDOC = (stepBasic, _, moreInfoDependency) => {
  // stepBasic, userData, moreInfoDependency
  // TODO: params to add - (stepSelect, stepBasic, userData)
  const body = {
    autor: {
      identificacion: {
        // numero: userData?.documentId ?? '', // id del usuario que envia
        numero: '9999999999',
      },
    },
    dependenciaAutor: {
      codigoNegocio: moreInfoDependency?.data?.identification ?? '',
    },
    tipoDocumento: {
      id: '1813', // Tipo de documento - oficio
    },
    serie: {
      codigoNegocio: '801114-077-277',
      // codigoNegocio: '801114-077', // Serie segun el excel de SIGEDOC
    },
    asunto: stepBasic?.asunto ?? '',
    observaciones: stepBasic?.descripcionSolicitud ?? '',
    dependenciaOrigen: {
      // codigoNegocio: '80118', // DIARI
      codigoNegocio: moreInfoDependency?.data?.identification ?? '', // identificacion de la dependencia
    },
    usuarioOrigen: {
      identificacion: {
        // numero: userData?.documentId ?? '', // id del usuario que envia
        numero: '9999999999',
      },
    },
    dependenciaDestino: {
      // codigoNegocio: '801114', // Identificacion de la dependencia DIARI
      codigoNegocio: moreInfoDependency?.data?.identification ?? '',
    },
    tipoDocumental: {
      // nombre: 'Informe', // Tipo de documento id - 1813 - oficio
      nombre: 'Informe de Analítica de Datos',
    },
    usuarioDestino: {
      identificacion: {
        // numero: '1117525925', // Cedula del director de la dependencia DIARI
        numero: '9999999999',
      },
    },
    carpeta: {
      // carpeta: 'Informes Oceano 2020'
      // id: '242958', //NOT DEFINED, we don't know
      id: '244984',
    },
  }

  return body
}

export const getSigedocRows = (row) => {
  const trackCode = row?.processData?.additionalData?.SIGEDOCcodigoDeSeguimiento
  const trackDate = row?.processData?.additionalData?.SIGEDOCfechaRadicacion
  return {
    ...row,
    sigedocNumber: trackCode ?? '',
    sigedocDate: formatToLocaleDate(trackDate),
  }
}
