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

const validateParameters = (stepSelect) => {
  // Parameter validation
  if (!stepSelect) {
    throw new Error('Valores inválidos')
  }

  // Property existence checks
  if (!stepSelect.dependency || !stepSelect.processType) {
    throw new Error('Faltan propiedades obligatorias en el paso Seleccion de Proceso')
  }
}

const structuredEntities = (entity) => {
  return { idEntity: entity.entity.id, emails: entity.emails, idUser: entity.entity.id_user }
}

export const requirementsBody = (stepSelect, stepEntities, SIGEDOC) => {
  // Validate parameters
  validateParameters(stepSelect)

  const entities = stepEntities.map(structuredEntities)

  // Create obj to send additionalData
  const processData = {
    additionalData: {},
    entities,
  }

  // Include SIGEDOC properties only if SIGEDOC exists
  if (SIGEDOC) {
    const {
      fechaCreacion,
      idDocumento: { id },
      archivo: { binarioCodificado },
    } = SIGEDOC

    processData.additionalData.SIGEDOCfechaRadicacion = fechaCreacion
    processData.additionalData.SIGEDOCcodigoDeSeguimiento = id
    processData.additionalData.archivo = binarioCodificado
  }

  // Construct the requirements body
  return {
    idOfficeOrigin: stepSelect.dependency.id,
    idProcessType: stepSelect.processType.id,
    processData,
  }
}

export const summaryCardSelect = (stepSelect) => {
  return [
    { label: 'Tipo de proceso', value: stepSelect?.processType?.name ?? '' },
    { label: 'Dependencia', value: stepSelect?.dependency?.name ?? '' },
    { label: 'Descripción', value: stepSelect?.description ?? '' },
  ]
}

export const summaryCardBasic = (stepBasic) => {
  return [
    { label: 'Vigencia consulta ', value: stepBasic?.vigenciaConsulta ?? '' },
    { label: 'Tipo de solicitud', value: stepBasic?.tipoSolicitud?.nombre ?? '' },
    { label: 'Uso de la información', value: stepBasic?.usoInformacion?.nombre ?? '' },
    { label: 'Descripción de la solicitud', value: stepBasic?.descripcionSolicitud ?? '' },
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

export const columnsEntitiesSummary = [
  {
    field: 'entity',
    headerName: 'Entidad',
    width: 200,
  },
  {
    field: 'emails',
    headerName: 'Emails',
    width: 200,
  },
]
