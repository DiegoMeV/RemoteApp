import { formatToLocaleDate } from '@/lib'
import axios from 'axios'

export const getBasicData = (qrDocumentInfo) => {
  const redactorName = `${qrDocumentInfo?.redactorData?.firstName ?? ''} ${
    qrDocumentInfo?.redactorData?.lastName ?? ''
  }`
  const transcriptorName = `${qrDocumentInfo?.transcriptorData?.firstName ?? ''} ${
    qrDocumentInfo?.transcriptorData?.lastName ?? ''
  }`

  const dataBasicArr = [
    { label: 'Número de documento:', value: qrDocumentInfo?.identificador ?? '' },
    { label: 'Tipo de documento:', value: qrDocumentInfo?.nombreMostrar ?? '' },
    { label: 'Fecha de creacion:', value: formatToLocaleDate(qrDocumentInfo?.fechaCreacion) ?? '' },
    {
      label: 'Fecha de Numeracion:',
      value: formatToLocaleDate(qrDocumentInfo?.fechaNumeracion) ?? '',
    },
    {
      label: 'Tabla de retencion documental:',
      value: qrDocumentInfo?.TablaRetencion?.nombre ?? '',
    },
    { label: 'Transcriptor:', value: transcriptorName },
    { label: 'Redactor:', value: redactorName },
  ]

  return dataBasicArr
}

export const requestQr = async (baseURL, queryURL, token) => {
  const headers = {
    Authorization: `Bearer ${token ?? ''}`,
  }
  const config = {
    method: 'get',
    url: queryURL,
    baseURL,
    headers,
  }

  const response = await axios(config)

  return response.data
}
