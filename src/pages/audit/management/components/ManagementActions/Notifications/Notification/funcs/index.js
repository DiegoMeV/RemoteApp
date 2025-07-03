import { buttons } from '../constants'

export const inputsNotifications = (watch) => {
  const isSMSChannel = watch('channel') === 'SMS'

  const textAreaProps = isSMSChannel
    ? {
        type: 'text',
        multiline: true,
        minRows: 4,
        maxRows: 6,
      }
    : {
        type: 'html',
        buttons: buttons,
      }

  return [
    {
      label: 'Canal',
      name: 'channel',
      type: 'select',
      defaultValue: 'EMAIL',
      options: [
        { value: 'EMAIL', label: 'Correo electrónico' },
        { value: 'SMS', label: 'SMS' },
      ],
      required: true,
    },
    {
      label: 'Para',
      name: 'to',
      type: 'text',
      required: true,
      validate: (value) => {
        if (!value) return 'Este campo es requerido'
        return true
      },
    },
    {
      label: 'Asunto',
      name: 'subject',
      type: 'text',
      required: true,
      space: 12,
    },
    {
      label: 'Mensaje',
      name: 'message',
      sm: 12,
      space: 12,
      required: true,
      ...textAreaProps,
    },
  ]
}

export const getDefaultValuesToNotification = (elementData, type) => {
  if (type === 'CREATE') {
    return elementData?.[0]?.allActivityActionItems?.length > 0
      ? elementData?.[0]?.allActivityActionItems
      : elementData?.[0]?.prevActivityNotifItems?.[0]
      ? [
          {
            id: crypto.randomUUID(),
            isNew: true,
            messageData: {
              ...elementData?.[0]?.prevActivityNotifItems?.[0]?.messageData,
              defaultEmailSender: elementData?.[0]?.actionItemSpecs?.defaultEmailSender,
            },
          },
        ]
      : [
          {
            id: crypto.randomUUID(),
            isNew: true,
            messageData: {
              channel: elementData?.[0]?.actionItemSpecs?.channel,
              to: elementData?.[0]?.actionItemSpecs?.defaultTo,
              subject: elementData?.[0]?.actionItemSpecs?.subject,
              defaultEmailSender: elementData?.[0]?.actionItemSpecs?.defaultEmailSender,
            },
          },
        ]
  } else if (type === 'REVIEW') {
    return elementData?.[0]?.allActivityActionItems?.length > 0
      ? elementData?.[0]?.allActivityActionItems
      : elementData?.[0]?.notificationsToBeHandledData?.map?.((noti) => {
          return {
            id: crypto.randomUUID(),
            isNew: true,
            messageData: {
              channel: noti.channel,
              to: noti.to,
              subject: noti.subject,
              message: noti.message,
              documents: noti.documents,
              defaultEmailSender: elementData?.[0]?.actionItemSpecs?.defaultEmailSender,
            },
          }
        }) || []
  } else if (type === 'SEND') {
    return elementData?.[0]?.allActivityActionItems?.length > 0
      ? elementData?.[0]?.allActivityActionItems
      : elementData?.[0]?.notificationsToBeHandledData?.length > 0
      ? elementData?.[0]?.notificationsToBeHandledData?.map?.((noti) => {
          return {
            id: crypto.randomUUID(),
            isNew: true,
            messageData: {
              channel: noti.channel,
              to: noti.to,
              subject: noti.subject,
              message: noti.message,
              documents: noti.documents,
              defaultEmailSender: elementData?.[0]?.actionItemSpecs?.defaultEmailSender,
            },
          }
        })
      : [
          {
            id: crypto.randomUUID(),
            isNew: true,
            messageData: {
              channel: elementData?.[0]?.actionItemSpecs?.channel,
              to: elementData?.[0]?.actionItemSpecs?.defaultTo,
              subject: elementData?.[0]?.actionItemSpecs?.subject,
              defaultEmailSender: elementData?.[0]?.actionItemSpecs?.defaultEmailSender,
            },
          },
        ]
  } else return []
}

export * from './VL'
