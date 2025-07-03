import { EditOption, GenericChip } from '../../components'
import { Box } from '@mui/material'
import { containerEditOptionAlertTable } from '../../components/styles'

export const columnsForContractsTypes = (navigate, hasPrivilege) => {
  const editContractType = (id) => {
    navigate(`/applications/contractsTypes/${id}`)
  }
  const columns = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      minWidth: '200',
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      minWidth: '200',
    },
    {
      field: 'activo',
      headerName: 'Estado',
      headerAlign: 'center',
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      renderCell: (params) => {
        return (
          <Box sx={containerEditOptionAlertTable}>
            <GenericChip params={params} />
          </Box>
        )
      },
    },
  ]
  if (hasPrivilege) {
    columns.push({
      field: 'options',
      headerName: '',
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      headerAlign: 'center',
      renderHeader: () => '',
      renderCell: (params) => (
        <Box sx={containerEditOptionAlertTable}>
          <EditOption
            onClick={() => {
              editContractType(params.row.id)
            }}
          />
        </Box>
      ),
      hideable: false,
    })
  }
  return columns
}
