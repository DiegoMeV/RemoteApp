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
      field: 'observation',
      headerName: 'Descripción',
      width: 400,
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
      width: 50,
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => {
              navigate(`/audit/massiveManagement/guides/create?idGuide=${params.id}`)
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
