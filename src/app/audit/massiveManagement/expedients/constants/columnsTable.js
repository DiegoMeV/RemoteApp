import { formatDateForTextfield, isEmpty } from '@/libV4'
import { Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export const columnsTable = ({ navigate }) => {
  const columns = [
    {
      field: 'identifier',
      headerName: 'Consecutivo',
      width: 150,
    },
    {
      field: 'ProcessType',
      headerName: 'Tipo de proceso',
      renderCell: (params) => {
        return params?.ProcessType?.name || ''
      },
    },
    {
      field: 'ProcessTypeTask',
      headerName: 'Actividad',
      renderCell: (params) => {
        return params?.ProcessTypeTask?.name || ''
      },
    },
    {
      field: 'observation',
      headerName: 'Descripción',
      width: 400,
    },
    {
      field: 'action',
      headerName: 'Acción',
      renderCell: (params) => {
        if (isEmpty(params?.action)) return ''
        return params?.action === 'APPLY_ACTIVITY'
          ? 'Solo aplicar actividad'
          : params?.action === 'GENERATE_DOCUMENT'
          ? 'Generar documento'
          : params?.action === 'GENERATE_CONSECUTIVE'
          ? 'Generar consecutivo'
          : params?.action === 'UPLOAD_FILE'
          ? 'Carga archivo anexo'
          : params?.action === 'GENERATE_CONSOLIDATED_DOCUMENT'
          ? 'Generar documento consolidado'
          : ''
      },
    },
    {
      field: 'createdAt',
      headerName: 'Fecha',
      renderCell: (params) => {
        if (isEmpty(params?.createdAt)) return ''
        return `${formatDateForTextfield(params?.createdAt)}`
      },
    },
    {
      field: 'options',
      headerName: '',
      pinned: 'right',
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => {
              navigate(`/audit/massiveManagement/expedients/create?idMassiveActivity=${params.id}`)
            }}
          >
            <Edit />
          </IconButton>
        )
      },
    },
  ]
  return columns
}
