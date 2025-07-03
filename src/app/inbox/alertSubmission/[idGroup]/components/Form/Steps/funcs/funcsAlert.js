import { MagicString } from '@/lib'

export const textInputType = (name, label) => {
  return {
    name: name,
    label: label,
    required: false,
    readOnly: true,
    sx: { width: '30%', minWidth: '100px' },
  }
}

export const normalizeText = (text) => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '')
    .toUpperCase()
}

export const handleAppend = (append) => {
  const idAlert = crypto.randomUUID()
  const newAlert = { id: idAlert, identifier: '', modelo: '', initialDate: '' }
  append(newAlert)
}

export const handleBackComplement = (complementFunction, setConfirmAlertProps, setStepAlert) => {
  setConfirmAlertProps({
    open: true,
    icon: 'warning',
    title: MagicString.GENERAL.CANCEL_TITLE,
    content: MagicString.REGISTRY.REGISTRY_ALERT_BACK_MESSAGE,
    onConfirm: () => {
      complementFunction()
      const idAlert = crypto.randomUUID()
      setStepAlert([{ id: idAlert, identifier: '', modelo: '', initialDate: '' }])
    },
  })
}

export const toggleDisabled = (row) => {
  return row.habilitar_boton !== 'S'
}

export const setItemAlertCurrentValue = (modalValue, index, setValue, rowsAlert) => {
  if (modalValue) {
    setValue(
      `alerts.${index}.initialDate`,
      modalValue?.fecha_registro ? new Date(modalValue?.fecha_registro).toLocaleDateString() : ''
    )
    if (modalValue?.id && !modalValue?.nombre_modelo) {
      const findAlert = rowsAlert?.find((alert) => {
        return alert.id === modalValue.id
      })
      setValue(`alerts.${index}.identifier`, findAlert ?? {})
      setValue(`alerts.${index}.modelo`, findAlert?.nombre_modelo ?? '')
      return
    }
    setValue(`alerts.${index}.modelo`, modalValue?.nombre_modelo ?? '')
  } else {
    setValue(`alerts.${index}.modelo`, '')
    setValue(`alerts.${index}.initialDate`, '')
  }
}

const escapeRegExp = (value) => {
  return value?.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

export const searchAlertRows = (searchText, rows, setFilteredRows) => {
  const searchRegex = new RegExp(escapeRegExp(searchText), 'i')
  const searchedRows = rows?.filter((row) => {
    return Object.keys(row).some((field) => {
      if (typeof row[field] === 'number' || typeof row[field] === 'string') {
        return searchRegex.test(row[field].toString())
      }
    })
  })
  setFilteredRows({ data: searchedRows ?? [] })
}

export const structureRowsAlertSummary = (alerts) => {
  return alerts?.map((alert) => {
    return {
      id: alert?.identifier?.id ?? '',
      alertName: alert?.identifier?.name ?? '',
      modelName: alert?.identifier?.nombre_modelo ?? '',
      initialDate: alert?.identifier?.fecha_registro ?? '',
      category: alert?.identifier?.nombre_categoria ?? '',
    }
  })
}
