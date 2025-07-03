import { formatDateForTextfield, isEmpty } from '@/lib'
import { Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export const columnsEndogens = ({ navigate }) => {
  const optionsModule = {
    I: 'Industria y Comercio',
    P: 'Impuesto Predial',
    O: 'Rentas varias',
    X: '',
  }
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
      field: 'module',
      headerName: 'Módulo',
      renderCell: (params) => {
        if (isEmpty(params?.module)) return ''
        return `${optionsModule[params?.module]}`
      },
    },
    {
      field: 'InspectionCauses',
      headerName: 'Causas de fiscalización',
      renderCell: (params) => {
        return params?.InspectionCauses?.name || ''
      },
    },
    {
      field: 'startPeriod',
      headerName: 'Periodo inicio',
      width: 100,
    },
    {
      field: 'period',
      headerName: 'Periodo fin',
      width: 100,
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
      headerName: 'Fecha de finalización',
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
              navigate(`/audit/expedient/endogens/create?idInspectionPlan=${params.id}`)
            }}
          >
            <Edit />
          </IconButton>
        )
      },
    },
  ]
}
