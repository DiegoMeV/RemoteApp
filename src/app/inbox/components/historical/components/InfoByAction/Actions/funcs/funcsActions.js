import { formatToLocaleDate } from '@/lib'

export const actionDocument = (props) => {
  return [
    `Tipo : ${props?.documentData?.showedName ?? ''}`,
    `Nombre : ${props?.documentData?.name ?? ''}`,
    `Estado : ${props?.documentStatus ?? ''}`,
    `Comentario : ${props?.commentData?.comentario ?? ''}`,
  ]
}

export const actionUser = (props) => {
  const assignedUserData = `${props?.assignedUserData?.firstName ?? ''} ${
    props?.assignedUserData?.lastName ?? ''
  }`
  return [
    `Usuario : ${assignedUserData}`,
    `Fecha estimada : ${formatToLocaleDate(props?.estimatedCompletion)}`,
    `Observación : ${props?.observation ?? ''}`,
  ]
}

export const actionNotification = (props) => {
  const user = `${props?.byUserData?.firstName ?? ''} ${props?.byUserData?.lastName ?? ''}`
  const chanel =
    props?.messageData?.channel === 'EMAIL' ? 'Correo electrónico' : props?.messageData?.channel
  return [
    `Usuario : ${user}`,
    `Asunto : ${props?.messageData?.subject ?? ''}`,
    `Canal : ${chanel}`,
    `Para : ${props?.messageData?.to ?? ''}`,
  ]
}

export const actionSigedoc = (props) => {
  return [
    `Asunto : ${props?.sigedocData?.subject ?? ''}`,
    `Codigo seguimiento : ${props?.sigedocResponse?.infoSIGEDOC?.SIGEDOCcodigoDeSeguimiento ?? ''}`,
    `Fecha radicación : ${
      formatToLocaleDate(props?.sigedocResponse?.infoSIGEDOC?.SIGEDOCfechaRadicacion) ?? ''
    }`,
  ]
}
