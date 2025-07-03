import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { MagicString } from '../constants'

dayjs.extend(utc)

/**
 * Formats a date to 'YYYY-MM-DD' string for textfield.
 * @param {string|Date} date - The date to format.
 * @returns {string} - The formatted date string.
 */
export const formatDateForTextfield = (date) => {
  if (!date) return ''
  const dateObj = new Date(date)
  return dateObj?.toISOString().split('T')[0] || ''
}

export const isDateFormat = (value) => {
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/

  if (!isoRegex.test(value)) {
    return value
  }

  return dayjs.utc(value).format(MagicString.DATE_FORMAT.ORACLE_FORMAT || 'YYYY-MM-DD HH:mm:ss')
}

/**
 * Formats a date to a locale string.
 * e.g., "9/8/2023, 3:24:00 PM"
 * @param {string|Date} date - The date to format.
 * @returns {string} - The formatted locale date string.
 */
export const formatToLocaleDate = (date) => {
  return date ? new Date(date).toLocaleString() : ''
}

/**
 * Formats a date to a locale date string.
 * // e.g., "9/8/2023"
 * @param {string|Date} date - The date to format.
 * @returns {string} - The formatted locale date string.
 */
export const formatToLocaleDateString = (date) => {
  return date ? new Date(date).toLocaleDateString() : ''
}

/**
 * Formats a date to a custom string format.
 * e.g., "8 de septiembre de 2023"
 * @param {string|Date} date - The date to format.
 * @returns {string} - The formatted custom date string.
 */
export const formatDateToCustomString = (date) => {
  if (!date) return ''

  const options = { year: 'numeric', month: 'long', day: '2-digit' }
  return new Date(date).toLocaleDateString('es-ES', options).replace(' de ', ' ')
}

export const formatToUTCDate = (date, format) => {
  if (!date) return ''
  const newDate = dayjs.utc(date).format(format || MagicString.DATE_FORMAT.DATE)
  return newDate
}

/**
 * Checks if a value is a money value (only digits).
 * @param {string} value - The value to check.
 * @returns {boolean} - True if the value is a money value, false otherwise.
 */
export const isMoneyValue = (value) => {
  const moneyPattern = /^\d+$/
  return moneyPattern.test(value)
}

/**
 * Converts a snake_case string to Title Case.
 * @param {string} key - The string to convert.
 * @returns {string} - The converted string.
 */
export const convertKeyToTitle = (key) => {
  return key
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase())
}

/**
 * Gets the value from an object based on a dot-separated string path.
 * @param {Object} obj - The object to get the value from.
 * @param {string} fuente - The dot-separated string path.
 * @returns {*} - The value at the specified path or null.
 */
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

/**
 * Converts an object to an array of key-value pairs for requests.
 * @param {Object} obj - The object to convert.
 * @returns {Array} - The array of key-value pairs.
 */
export const objectToArrayForRequests = (obj) => {
  return Object.keys(obj).map((key) => {
    return {
      id: key,
      value: obj[key] ?? '',
    }
  })
}

/**
 * Calculates the age based on a birth date.
 * @param {string|Date} date - The birth date.
 * @returns {number} - The calculated age.
 */
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

/**
 * Converts a value to a number.
 * @param {string} value - The value to convert.
 * @returns {number|undefined} - The converted number or undefined if the value is empty or null.
 */
export const convertToNumber = (value) => {
  if (value === '' || !value) return
  return Number(value)
}

/**
 * Removes undefined and null values from an array or object.
 * @param {Array|Object} data - The data to clean.
 * @returns {Array|Object} - The cleaned data.
 */
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

export const filterNullAndUndefinedValues = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj

  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined) {
      acc[key] = value
    }
    return acc
  }, {})
}

/**
 * Formats a value to Colombian currency format.
 * @param {number} value - The value to format.
 * @param {string} [style='currency'] - The formatting style.
 * @returns {string} - The formatted currency string.
 */
export const formatColombianMoney = (value, style = 'currency', aditionalProps = {}) => {
  const props = style === 'currency' ? { style: 'currency', currency: 'COP' } : ''
  if (value === '' || !value) return '$0'
  return new Intl.NumberFormat('es-CO', {
    ...aditionalProps,
    ...props,
  }).format(value)
}

export const formatMoney = (value, style) => {
  return new Intl.NumberFormat('es-CO', {
    style,
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Converts a JSON string to an object.
 * @param {string} string - The JSON string to convert.
 * @param {string} [variable] - The variable name for error logging.
 * @returns {Object} - The parsed object.
 */
export const stringToObject = (string, variable) => {
  let objectParsed = {}
  if (string) {
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

/**
 * Converts a string to a boolean.
 * @param {string} value - The string to convert.
 * @returns {boolean|null} - The converted boolean or null if the value is not 'true' or 'false'.
 */
export const toBoolean = (value) => {
  if (value === 'true') return true
  if (value === 'false') return false
  return null
}

export const valueToString = (value) => {
  if (value !== null && value !== undefined) {
    return `'${String(value).replace(/'/g, "''")}'`
  }
  return null
}

export const valueToNumber = (value) => {
  if (value === null || value === undefined || value === '') {
    return null
  }
  const number = Number(value)
  return isNaN(number) ? `'${value}'` : number
}

export const currentDay = (format) => {
  return dayjs().format(format ?? 'DD/MM/YYYY')
}

export const formatDayjsProperties = ({ obj, format = 'YYYY-MM-DD', dateKeys = [] }) => {
  if (!obj || typeof obj !== 'object') return obj

  if (Array.isArray(obj)) {
    return obj.map((item) => formatDayjsProperties({ obj: item, format, dateKeys }))
  }

  const newObj = {}

  for (const [key, value] of Object.entries(obj)) {
    if (dayjs.isDayjs(value)) {
      newObj[key] = value.isValid() ? value.format(format) : null
    } else if (typeof value === 'string' && dateKeys.includes(key)) {
      const dateValue = dayjs(value)
      newObj[key] = dateValue.isValid() ? dateValue.format(format) : value
    } else if (typeof value === 'object' && value !== null) {
      newObj[key] = formatDayjsProperties({ obj: value, format, dateKeys })
    } else {
      newObj[key] = value
    }
  }

  return newObj
}

export const iterationNumber = (min = 2, max = MagicString?.NOMINA?.encodeIterations) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const toHex = (str) => {
  return Array.from(new TextEncoder().encode(str))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export const encodeString = (iterations, value) => {
  let encode = value
  for (let i = 1; i <= iterations; i++) {
    if (i === 1) {
      encode = toHex(encode)
    } else {
      encode = btoa(encode)
    }
  }
  return encode
}

export const encodeKeys = (obj, numIterations) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const encodedKey = encodeString(numIterations, key)
    acc[encodedKey] = value
    return acc
  }, {})
}
