import { Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const recordColumns = (navigate, hasEditPrivilege) => {
  const columns = [
    {
      field: 'numero_contrato',
      headerName: 'Número de contrato',
      minWidth: 150,
    },
    {
      field: 'sigedoc_inclusion',
      headerName: 'Sigedoc inclusión',
      minWidth: 150,
    },
    {
      field: 'caso_individual_cat',
      headerName: 'CAT',
      minWidth: 150,
    },
    {
      field: 'modelo',
      headerName: 'Modelo',
      minWidth: 150,
    },
    {
      field: 'sector_alertado',
      headerName: 'Sector alertado',
      minWidth: 150,
    },
    {
      field: 'numero_alerta',
      headerName: 'Número de alerta',
      minWidth: 150,
    },
  ]
  if (hasEditPrivilege) {
    columns.push({
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
            <Edit
              onClick={() => navigate(`/applications/uri/registryUri?idRecord=${params.row?.id}`)}
            />
          </IconButton>
        )
      },
      hideable: false,
      filterable: false,
    })
  }

  return columns
}
export default recordColumns
