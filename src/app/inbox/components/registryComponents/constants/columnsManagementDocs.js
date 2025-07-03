export const columnsManagementDocs = ({ copy } = {}) => {
  const valuesTypeDocument = {
    CC: 'Cédula de Ciudadanía',
    CE: 'Cédula de Extranjería',
    NIT: 'Número de Identificación Tributaria',
    NUI: 'Número Único de Identificación',
    NUIP: 'Número Único de Identificación Personal',
    PAS: 'Pasaporte',
    PEP: 'Permiso Especial de Permanencia',
    PPT: 'Permiso por Protección Temporal',
    RC: 'Registro Civil',
    TD: 'Tarjeta de Diplomático',
    TI: 'Tarjeta de Identidad',
    VISA: 'Visa',
  }
  const columns = [
    {
      field: 'applicantType',
      headerName: 'Tipo de  solicitante',
      valueGetter: (params) => {
        return params.row?.personalData?.applicantType || 'N/A'
      },
    },
    {
      field: 'fullName',
      headerName: 'Nombre completo',
      valueGetter: (params) => {
        return params.row?.personalData?.fullName || 'N/A'
      },
    },
    {
      field: 'businessName',
      headerName: 'Razón social',
      valueGetter: (params) => {
        return params.row?.personalData?.businessName || 'N/A'
      },
    },
    {
      field: 'documentType',
      headerName: 'Tipo de documento',
      valueGetter: (params) => {
        return valuesTypeDocument[params.row?.personalData?.documentType] || 'N/A'
      },
    },
    {
      field: 'documentNumber',
      headerName: 'Número de identificación',
      valueGetter: (params) => {
        return params.row?.personalData?.documentNumber || 'N/A'
      },
    },
    {
      field: 'phoneNumber',
      headerName: 'Número de celular',
      valueGetter: (params) => {
        return params.row?.personalData?.phoneNumber || 'N/A'
      },
    },
  ]
  if (copy) {
    columns.push({
      field: 'copy',
      headerName: 'Copia',
    })
  }
  return columns
}
