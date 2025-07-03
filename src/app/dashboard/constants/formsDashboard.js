import { Box, Typography } from '@mui/material'

export const inputsFormIndicators = [
  { label: 'Fecha inicio', type: 'date', md: 3 },
  { label: 'Fecha final', type: 'date', md: 3 },
  { label: 'Complejidad RTA', type: 'select', md: 6 },
]
export const inputsFormAnalytics = {
  byYear: [
    { label: 'Año inicio', type: 'date', md: 2.75 },
    { label: 'Año final', type: 'date', md: 2.75 },
  ],
  byMouth: [
    { label: 'Mes inicio', type: 'date', md: 2.75 },
    { label: 'Mes final', type: 'date', md: 2.75 },
  ],
  byRange: [
    { label: 'Fecha inicio', type: 'date', md: 2.75 },
    { label: 'Fecha final', type: 'date', md: 2.75 },
  ],
}
export const formatDate = (params, errorMessage) => {
  if (params.value) {
    const date = new Date(params.value)
    return date.toLocaleDateString()
  }
  return errorMessage
}
const analystInfo = (params) => (
  <Box>
    {params.row?.analysts?.leadAnalyst
      ? `Analista líder:  ${
          params.row?.analysts?.leadAnalyst?.userData?.firstName ?? 'No definido'
        } ${params.row?.analysts?.leadAnalyst?.userData?.lastName || ''}`
      : ''}
    <br />
    {params.row?.analysts?.assistantAnalyst
      ? `Analista auxiliar: ${
          params.row?.analysts?.assistantAnalyst?.userData?.firstName ?? 'No definido'
        } ${params.row?.analysts?.assistantAnalyst?.userData?.lastName || ''}`
      : ''}
  </Box>
)

export const columnsSearchTable = () => {
  return [
    {
      field: 'identifier',
      headerName: 'ID único',
      width: 200,
    },
    {
      field: 'createdAt',
      headerName: 'Fecha de solicitud',
      width: 200,
      valueFormatter: (params) => formatDate(params, 'Error al obtener la fecha de inicio'),
    },
    {
      field: 'completedAt',
      headerName: 'Fecha Rta destinatario final',
      width: 200,
      valueFormatter: (params) => formatDate(params, 'No completado'),
    },
    {
      field: 'requestingDepartmentName',
      headerName: 'Delegada / Entidad solicitante',
      width: 200,
      valueFormatter: (params) => params.row?.processData?.additionalData?.requestingDepartmentName,
    },
    {
      field: 'SIGEDOCIncoming',
      headerName: 'SIGEDOC entrante',
      width: 200,
      valueFormatter: (params) => params.row?.processData?.additionalData?.SIGEDOCResponse,
    },
    {
      field: 'SIGEDOCOutgoing',
      headerName: 'SIGEDOC saliente',
      width: 200,
      valueFormatter: (params) => params.row?.processData?.additionalData?.SIGEDOCResponse,
    },
    {
      field: 'typeRequest',
      headerName: 'Tipo de solicitud',
      width: 200,
      valueGetter: (params) => {
        return `${params.row?.additionalData?.[0]?.tipoSolicitud}`
      },
    },
    {
      field: 'analysts',
      headerName: 'Analista',
      width: 400,
      valueGetter: (params) => `${analystInfo(params)}`,
    },
    {
      field: 'descripcion ',
      headerName: 'Descripción',
      width: 200,
      valueGetter: (params) => {
        return `${params.row?.additionalData?.[0]?.descripcionSolicitud ?? ''}`
      },
    },
    {
      field: 'complexityLabel',
      headerName: 'Complejidad de la respuesta',
      width: 200,
    },
    {
      field: 'useInfo',
      headerName: 'Uso de la información',
      width: 200,
      renderCell: (params) => (
        <Typography>{params.row?.additionalData?.[0]?.nombreUsoInformacion}</Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Estado',
      width: 200,
    },
  ]
}
