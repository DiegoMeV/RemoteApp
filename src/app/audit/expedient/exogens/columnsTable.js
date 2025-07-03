import { formatDateForTextfield, isEmpty } from '@/lib'
import { Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export const columnsExogens = ({ navigate }) => {
  return [
    {
      field: 'identifier',
      headerName: 'Consecutivo',
      width: 100,
    },
    {
      field: 'ProcessType',
      headerName: 'Tipo de proceso',
      width: 200,
      renderCell: (params) => {
        return params?.ProcessType?.name || ''
      },
    },
    {
      field: 'startDate',
      headerName: 'Fecha de inicio',
      width: 100,
      renderCell: (params) => {
        if (isEmpty(params?.startDate)) return ''
        return formatDateForTextfield(params?.startDate)
      },
    },
    {
      field: 'endDate',
      headerName: 'Fecha de fin',
      width: 100,
      renderCell: (params) => {
        if (isEmpty(params?.endDate)) return ''
        return formatDateForTextfield(params?.endDate)
      },
    },
    {
      field: 'options',
      headerName: '',
      width: 50,
      pinned: 'right',
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => {
              navigate(`/audit/expedient/exogens/create?idInspectionPlan=${params?.id}`)
            }}
          >
            <Edit />
          </IconButton>
        )
      },
    },
  ]
}
