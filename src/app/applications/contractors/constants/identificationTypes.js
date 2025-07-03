export const identificationTypes = {
  CC: 'Cédula de ciudadanía',
  CE: 'Cédula de extranjería',
  NIT: 'NIT',
  TI: 'Tarjeta de identidad',
  MS: 'Menor sin identificación',
  AS: 'Adulto sin identificación',
  EI: 'Extranjero sin identificación',
  RC: 'Registro civil',
  NV: 'Certificado de nacido vivo',
  PA: 'Pasaporte',
  PIP: 'Permiso de Ingerso y Permanencia',
  PPT: 'Permiso de Proteccion Temporal',
}

export const identificationTypesSelect = [
  { value: 'CC', label: 'Cédula de ciudadanía' },
  { value: 'CE', label: 'Cédula de extranjería' },
  { value: 'NIT', label: 'NIT' },
  { value: 'PA', label: 'Pasaporte' },
]

export const renderCell = (params) => {
  return identificationTypes[params.row.tipo_identificacion] || 'N/A'
}
