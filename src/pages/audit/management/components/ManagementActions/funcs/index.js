import { MagicString, formatToLocaleDate } from '@/lib'
import { isEmpty } from '@/libV4'

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

export const basicDataProcessAndActivity = (
  processInfo,
  activityToCreate,
  activityInfo,
  setActivityToCreate,
  actualActivity
) => {
  const idProcessType = processInfo?.[0]?.ProcessType?.id

  const activityValue = !isEmpty(activityToCreate)
    ? activityToCreate
    : activityInfo?.[0]
    ? activityInfo?.[0]?.Task
    : []

  return [
    {
      label: 'Nro Radicado',
      value: processInfo?.[0]?.identifier ?? '',
      InputProps: {
        readOnly: true,
        sx: {
          fontWeight: 'bold',
          fontSize: '16px',
        },
      },
    },
    {
      label: 'Tipo de proceso',
      value: processInfo?.[0]?.ProcessType?.name ?? '',
      InputProps: {
        readOnly: true,
        sx: {
          fontWeight: 'bold',
          fontSize: '16px',
        },
      },
    },
    {
      label: 'Etapa - Actividad',
      value: activityValue,
      disabled: !isEmpty(activityValue) && actualActivity,
      onChange: (_, value) => {
        if (value) {
          setActivityToCreate(value)
        }
      },
      type: 'autocompleteRequest',
      requestprops: {
        baseKey: 'urlFiscalizacion',
        url: `/process-types/${idProcessType}/util/all-activities`,
        isPaginated: false,
      },
      vlprops: {
        shouldClose: true,
        columns: [
          {
            dataIndex: 'parentTask',
            title: 'Etapa',
            render: (_, data) => data?.ParentTask?.name ?? '',
          },
          {
            dataIndex: 'task',
            title: 'Actividad',
            render: (_, data) => data?.name ?? '',
          },
        ],
        toolbarProps: {
          searchProps: {},
        },
      },
      getOptionLabel: (option) => {
        return `${option?.ParentTask?.name ?? ''}${option?.name ? ` - ${option?.name}` : ''}`
      },
      className: 'col-span-12',
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
