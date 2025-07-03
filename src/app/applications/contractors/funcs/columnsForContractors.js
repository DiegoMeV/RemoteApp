import { EditOption } from '../../components'
import { Box, Typography } from '@mui/material'
import { containerEditOptionAlertTable } from '../../components/styles'
import { renderCell } from '../constants'

export const columnsForContractors = (navigate, hasPrivilege) => {
  const editContractType = (id) => {
    navigate(`/applications/contractors/${id}`)
  }
  const columns = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      minWidth: '200',
      renderCell: (params) => (
        <Typography variant='body2'>
          {`${params?.row?.nombre_1 ?? ''} ${params?.row?.nombre_2 ?? ''} ${
            params?.row?.apellido_1 ?? ''
          } ${params?.row?.apellido_2 ?? ''}`.trim()}
        </Typography>
      ),
    },
    {
      field: 'tipo_identificacion',
      headerName: 'Tipo identificación',
      minWidth: '200',
      renderCell: renderCell,
    },
    {
      field: 'nro_identificacion',
      headerName: 'Número identificación',
      minWidth: '200',
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
