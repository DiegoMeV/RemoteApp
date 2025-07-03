export const basicDataInputs = (validEmail, matchIsValidTel) => [
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
    label: 'Tipo de documento',
    name: 'documentType',
    type: 'select',
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
    className: 'xs:col-span-12 lg:col-span-9',
  },
  {
    label: 'Estado del usuario',
    name: 'isActive',
    type: 'select',
    defaultValue: true,
    options: [
      { label: 'Activo', value: true },
      { label: 'Inactivo', value: false },
    ],
    className: 'col-span-12',
  },
]
export const aditionalData = [
  { name: 'address', label: 'Dirección', className: 'col-span-12' },
  { name: 'department', label: 'Departamento', className: 'col-span-12' },
  { name: 'municipality', label: 'Municipio', className: 'col-span-12' },
  {
    name: 'expeditionPlace',
    label: 'Lugar de expedición identificación Ej: Pereira, Risaralda',
    className: 'col-span-12',
  },
]
