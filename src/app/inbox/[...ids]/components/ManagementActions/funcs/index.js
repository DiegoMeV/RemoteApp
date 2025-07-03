import { MagicString, formatToLocaleDate } from '@/lib'

export * from './documentReview'
export * from './documentUpdate'
export * from './common'
export * from './generation'

export const selectedUser = (newValue, setValue) => {
  if (!newValue) {
    setValue('idJobTitle', null)
    setValue('idUser', null)
    setValue('user', null)
    return
  }
  setValue('idJobTitle', newValue?.id)
  setValue('idUser', newValue?.idUser)
  setValue('user', newValue)
}

export const basicDataProcessAndActivity = (processInfo, activityInfo) => {
  return [
    {
      label: 'Nro Radicado',
      value: processInfo?.[0]?.identifier ?? '',
      fontWeight: 'bold',
      fontSize: '16px',
    },
    {
      label: 'Tipo de proceso',
      value: processInfo?.[0]?.ProcessType?.name ?? '',
      fontWeight: 'bold',
      fontSize: '16px',
    },
    {
      label: 'Etapa',
      value: activityInfo?.[0]?.Task?.ParentTask?.name ?? '',
    },
    {
      label: 'Actividad',
      value: activityInfo?.[0]?.Task?.name ?? '',
    },
    { label: 'Estado', value: MagicString.STATUS[activityInfo?.[0]?.status] ?? '' },
    {
      label: 'Fecha de notificación',
      value: formatToLocaleDate(activityInfo?.[0]?.notifiedAt),
    },
    {
      label: 'Fecha estimada de terminación',
      value: formatToLocaleDate(activityInfo?.[0]?.estimatedCompletion),
    },
    {
      label: 'Fecha de inicio de gestión',
      value: formatToLocaleDate(activityInfo?.[0]?.startedAt),
    },
  ]
}
