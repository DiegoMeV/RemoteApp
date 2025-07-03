export const bodyGenerateSIGEDOC = (stepBasic, _, moreInfoDependency, typeSIGEOC) => {
  const body = {
    documentoComunicacion: {
      autor: {
        identificacion: {
          numero: stepBasic?.idAuthor ?? '',
        },
      },
      tipoDocumento: {
        id: stepBasic?.documentTypeRequest?.codigoInterno ?? '',
      },
      asunto: stepBasic?.subject ?? '',
    },
  }

  if (typeSIGEOC === 'IE') {
    body.documentoComunicacion = {
      ...body?.documentoComunicacion,
      dependenciaAutor: {
        codigoNegocio: moreInfoDependency?.identification ?? '',
      },
      serie: {
        codigoNegocio: stepBasic?.serie?.codigo ?? '',
      },
      observaciones: stepBasic?.descripcionSolicitud ?? '',
      dependenciaOrigen: {
        codigoNegocio: moreInfoDependency?.identification ?? '',
      },
      usuarioOrigen: {
        identificacion: {
          numero: stepBasic?.idAuthor ?? '',
        },
      },
      carpeta: {
        id: stepBasic?.folder?.idCarpeta ?? '',
      },
      tipoDocumental: {
        nombre: stepBasic?.typology?.nombre ?? '',
      },
      dependenciaDestino: {
        codigoNegocio: stepBasic?.destinyOffice?.TRDcode ?? '',
      },
      usuarioDestino: {
        identificacion: {
          numero: stepBasic?.destinyUser?.id ?? '',
        },
      },
    }
  } else if (typeSIGEOC === 'ER') {
    body.documentoComunicacion = {
      ...body?.documentoComunicacion,
      dependenciaDestino: {
        codigoNegocio: stepBasic?.destinyOffice?.TRDcode ?? '',
      },
      usuarioDestino: {
        identificacion: {
          numero: stepBasic?.destinyUser?.id ?? '',
        },
      },
      tercero: {
        ...stepBasic?.tercero,
      },
    }
  } else {
    body.documentoComunicacion = {
      ...body?.documentoComunicacion,
      dependenciaOrigen: {
        codigoNegocio: moreInfoDependency?.identification ?? '',
      },
      usuarioOrigen: {
        identificacion: {
          numero: stepBasic?.idAuthor ?? '',
        },
      },
      serie: {
        codigoNegocio: stepBasic?.serie?.codigo ?? '',
      },
      carpeta: {
        id: stepBasic?.folder?.idCarpeta ?? '',
      },
      tipoDocumental: {
        nombre: stepBasic?.typology?.nombre ?? '',
      },
      tercero: {
        ...stepBasic?.tercero,
      },
    }
  }

  return body
}

export const editionProccessBody = (SIGEDOC) => {
  // Include SIGEDOC properties only if SIGEDOC exists
  if (SIGEDOC) {
    return {
      SIGEDOCfechaRadicacion: SIGEDOC.fechaCreacion,
      SIGEDOCcodigoDeSeguimiento: SIGEDOC.idDocumento.id,
      archivo: SIGEDOC.archivo.binarioCodificado,
    }
  }
}

export const bodyGenerateSIGEDOCReceiveCOMM = (basicInfo, infoThirdDestination) => {
  const body = {
    documentoComunicacion: {
      autor: {
        identificacion: {
          numero: '9999999999',
        },
      },
      tipoDocumento: {
        id: '1813',
      },
      asunto: basicInfo?.subject ?? '',
      dependenciaDestino: {
        codigoNegocio: '801114',
      },
      tercero: {
        identificacion: infoThirdDestination?.identification ?? '',
        tipoIdentificacion: infoThirdDestination?.typeIdentification ?? '',
        nombre: infoThirdDestination?.name ?? '',
        apellido: infoThirdDestination?.lastName ?? '',
        correo: infoThirdDestination?.correo ?? '',
      },
      usuarioDestino: {
        identificacion: {
          numero: '9999999999',
        },
      },
    },
  }

  return body
}
