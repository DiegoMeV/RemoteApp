import { MagicString, validEmail } from '@/libV4'
import { matchIsValidTel } from 'mui-tel-input'

const validateTel = (value) => {
  return value !== '' && !!value ? matchIsValidTel(value) : true
}

export const inputsInfoAccount = [
  {
    name: 'firstName',
    type: 'text',
    key_label: 'Nombre',
  },
  {
    name: 'lastName',
    type: 'text',
    key_label: 'Apellido',
  },
  {
    name: 'cellPhone',
    type: 'tel',
    key_label: 'Teléfono móvil',
    validate: validateTel,
  },
  {
    name: 'email',
    type: 'email',
    key_label: 'Email',
  },
  {
    name: 'address',
    type: 'Dirección',
    key_label: 'Dirección',
  },
  {
    name: 'department',
    type: 'Departamento',
    key_label: 'Departamento',
  },
  {
    name: 'municipality',
    type: 'Municipio',
    key_label: 'Municipio',
  },
]

const validateTwoWordsWithComma = (value) => {
  // Verifica si hay más de dos caracteres especiales
  const specialCharacters = value.match(/[^a-zA-Z0-9\s,]/g)
  if (specialCharacters && specialCharacters.length > 4) {
    return 'No puede contener más de 4 caracteres especiales'
  }

  // Verifica si hay dos palabras separadas por una coma
  const words = value.split(',').map((word) => word.trim())
  if (words.length !== 2 || words.some((word) => word === '')) {
    return 'Debe contener dos palabras separadas por una coma'
  }

  return true
}

export const basicDataInputs = (userData) => [
  {
    label: 'Nombre',
    name: 'firstName',
    required: true,
    className: 'col-span-12',
  },
  {
    label: 'Apellido',
    name: 'lastName',
    className: 'col-span-12',
  },
  {
    label: 'Correo',
    name: 'email',
    required: true,
    validate: validEmail,
    InputProps: {
      readOnly: true,
    },
    className: 'col-span-12',
  },
  {
    label: 'Teléfono Móvil',
    name: 'cellPhone',
    type: 'tel',
    validate: (value) => {
      const isValid = value ? matchIsValidTel(value) : true
      return value !== '' && !!value ? (isValid ? true : 'Teléfono móvil no válido') : true
    },
    className: 'col-span-12',
  },
  {
    name: 'address',
    label: 'Dirección',
    className: 'col-span-12',
  },
  {
    name: 'department',
    label: 'Departamento',
    className: 'col-span-12',
  },
  {
    name: 'municipality',
    label: 'Municipio',
    className: 'col-span-12',
  },
  {
    label: 'Tipo de documento',
    name: 'documentType',
    type: 'select',
    required: true,
    InputProps: {
      readOnly: !!userData?.documentType && userData?.documentType?.trim() !== '',
    },
    options: [
      { value: 'CC', label: 'Cédula de ciudadanía' },
      { value: 'CE', label: 'Cédula de extranjería' },
      { value: 'NIT', label: 'Número de identificación tributaria' },
      { value: 'NIP', label: 'Número de identificación personal' },
      { value: 'NUIP', label: 'Número único de identificación personal' },
      { value: 'PASAPORTE', label: 'Pasaporte' },
      { value: 'REGISTRO_CIVIL', label: 'Registro civil' },
      { value: 'TE', label: 'Tarjeta de extranjería' },
      { value: 'TI', label: 'Tarjeta de identidad' },
    ],
    className: 'xs:col-span-12 lg:col-span-3',
  },
  {
    label: 'Número de documento',
    name: 'documentId',
    required: true,
    InputProps: {
      readOnly: !!userData?.documentId && userData?.documentId?.trim() !== '',
    },
    className: 'xs:col-span-12 lg:col-span-9',
  },
  {
    label: MagicString.INPUTS.PLACE_ID,
    name: 'expeditionPlace',
    validate: validateTwoWordsWithComma,
    InputProps: {
      readOnly: !!userData?.expeditionPlace,
    },
    className: 'col-span-12',
  },
]

export const activityData = [
  {
    id: 1,
    date: 'Hoy',
    action: 'Creó una tarea',
    description: 'Descripción de la tarea creada...',
  },
  {
    id: 2,
    date: 'Ayer',
    action: 'Completó una tarea',
    description: 'Descripción de la tarea completada...',
  },
  {
    id: 2,
    date: 'Ayer',
    action: 'Completó una tarea',
    description: 'Descripción de la tarea completada...',
  },
  {
    id: 2,
    date: 'Ayer',
    action: 'Completó una tarea',
    description: 'Descripción de la tarea completada...',
  },
  {
    id: 2,
    date: 'Ayer',
    action: 'Completó una tarea',
    description: 'Descripción de la tarea completada...',
  },
  {
    id: 2,
    date: 'Ayer',
    action: 'Completó una tarea',
    description: 'Descripción de la tarea completada...',
  },
  {
    id: 2,
    date: 'Ayer',
    action: 'Completó una tarea',
    description: 'Descripción de la tarea completada...',
  },
  {
    id: 2,
    date: 'Ayer',
    action: 'Completó una tarea',
    description: 'Descripción de la tarea completada...',
  },
  {
    id: 2,
    date: 'Ayer',
    action: 'Completó una tarea',
    description: 'Descripción de la tarea completada...',
  },
  {
    id: 2,
    date: 'Ayer',
    action: 'Completó una tarea',
    description: 'Descripción de la tarea completada...',
  },
]
