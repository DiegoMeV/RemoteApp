import { isEmpty } from '@/libV4'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

export const formatDateForTextfield = (date) => {
  if (!date) return ''
  const dateObj = new Date(date)
  return dateObj?.toISOString().split('T')[0] || ''
}
export const formatToLocaleDate = (date) => {
  return date ? new Date(date).toLocaleString() : ''
}

export const formatToLocaleDateString = (date) => {
  return date ? new Date(date).toLocaleDateString() : ''
}
export const formatDateToCustomString = (date) => {
  if (!date) return ''
  const options = { year: 'numeric', month: 'long', day: '2-digit' }
  return new Date(date).toLocaleDateString('es-ES', options).replace(' de ', ' ')
}

export const formatToLocaleTimeString = (date) => {
  if (!date) return ''

  const options = { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'UTC' }
  return new Date(date).toLocaleDateString('es-ES', options).replace(' de ', ' ')
}
export const isMoneyValue = (value) => {
  const moneyPattern = /^\d+$/
  return moneyPattern.test(value)
}
export const isDate = (value) => {
  return !isNaN(Date.parse(value)) && new Date(value).toISOString() === value
}

export const isDateString = (value) => {
  if (!value) return false

  // Lista de formatos permitidos
  const allowedFormats = [
    'YYYY-MM-DD',    // Formato ISO
    'DD/MM/YYYY',    // Formato común en español
    'MM/DD/YYYY',    // Formato común en inglés
    'DD-MM-YYYY',    // Formato con guiones
    'YYYY/MM/DD',    // Formato inverso con barras
  ]

  // Verifica si el valor es válido en alguno de los formatos
  return allowedFormats.some((format) => dayjs(value, format, true).isValid())
}

export const toDayjsDate = (arg) => {
  if (typeof arg === 'string' && !isEmpty(arg)) {
    if (dayjs(arg, 'DD/MM/YYYY', true).isValid()) {
      return dayjs(arg, 'DD/MM/YYYY')
    }
    return dayjs(arg)
  } else if (arg instanceof Date) {
    return dayjs(arg)
  } else if (dayjs.isDayjs(arg)) {
    return arg
  }

  return null
}

export const currentYear = new Date().getFullYear()

export const convertKeyToTitle = (key) => {
  // Convierte snake_case a Title Case
  return key
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase())
}

export const getValue = (obj, fuente) => {
  const propiedades = fuente.split('.')
  let value = obj
  propiedades.forEach((element) => {
    if (!value) {
      return null
    }
    value = value[element] || null
  })
  return value
}

export const objectToArrayForRequests = (obj) => {
  return Object.keys(obj).map((key) => {
    return {
      id: key,
      value: obj[key] ?? '',
    }
  })
}

export const calculateAge = (date) => {
  const today = new Date()
  const birthDate = new Date(date)
  const m = today.getMonth() - birthDate.getMonth()
  let age = today.getFullYear() - birthDate.getFullYear()

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1
  }

  return age
}

export const convertToNumber = (value) => {
  if (value === '' || !value) return
  return Number(value)
}

export const removeUndefinedAndNullValues = (data = []) => {
  if (Array.isArray(data)) {
    return data.filter((item) => item !== undefined && item !== null)
  }

  if (typeof data === 'object' && data !== null) {
    return Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value
      }
      return acc
    }, {})
  }

  return data
}

export const formatColombianMoney = (value, style = 'currency') => {
  const props = style === 'currency' ? { style: 'currency', currency: 'COP' } : ''
  if (value === '' || !value) return '$0'
  return new Intl.NumberFormat('es-CO', {
    ...props,
  }).format(value)
}

export const deepEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true

  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) return false

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false
    }
  }

  return true
}

export const stringToObject = (string, variable) => {
  let objectParsed = {}
  if (string) {
    // Convertir la cadena JSON a un objeto
    try {
      const myObject = JSON.parse(string)
      objectParsed = myObject
    } catch (error) {
      console.error(
        `Error al convertir la variable ${variable ?? ''} de entorno a un objeto:`,
        error
      )
    }
  }

  return objectParsed
}

export const toBoolean = (value) => {
  if (value === 'true') return true
  if (value === 'false') return false
  return null
}

export const replacePlaceholders = (str, values) => {
  return str.replace(/\$\{(.*?)\}/g, (match, key) => {
    return key in values ? values[key] : match
  })
}
