import { Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const compromiseColumns = (navigate) => {
  const columns = [
    {
      field: 'caso_individual_cat',
      headerName: 'Caso individual',
      width: 200,
      valueGetter: (params) => {
        ;`${params?.row?.caso_individual_cat ?? ''}`
      },
    },
    {
      field: 'tipo_compromiso',
      headerName: 'Tipo compromiso',
      width: 200,
      valueGetter: (params) => `${params?.row?.tipo_compromiso ?? ''}`,
    },
    {
      field: 'compromiso',
      headerName: 'Compromiso',
      width: 200,
      valueGetter: (params) => `${params?.row?.compromiso ?? ''}`,
    },
    {
      field: 'options',
      headerName: '',
      width: 60,
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      cellClassName: 'actions',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <IconButton>
            <Edit onClick={() => navigate(`/applications/uri/compromise/${params.row?.id}`)} />
          </IconButton>
        )
      },
      hideable: false,
      filterable: false,
    },
  ]

  return columns
}
export default compromiseColumns
