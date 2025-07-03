import { Box } from '@mui/material'
import { containerEditOptionAlertTable } from '../../components/styles'
import { EditOption } from '../../components'

export const columnsContracts = (navigate, hasPrivilege) => {
  const onClick = (id) => {
    navigate(`/applications/contracts/${id}`)
  }
  const columns = [
    { field: 'identificador', headerName: 'Numero', width: 200 },
    { field: 'nombre_tipo_contrato', headerName: 'Modalidad contratación', width: 200 },
    {
      field: 'terceroInfo',
      headerName: 'Contratista',
      width: 200,
      valueGetter: (params) => {
        const { terceroInfo } = params.row
        return `${terceroInfo?.nombre_1 ?? ''} ${terceroInfo?.nombre_2 ?? ''} ${
          terceroInfo?.apellido_1 ?? ''
        } ${terceroInfo?.apellido_1 ?? ''}`
      },
    },
    { field: 'objeto', headerName: 'Objeto Contrato', width: 200 },
    {
      field: 'estado',
      headerName: 'Estado',
      headerAlign: 'center',
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
          <EditOption onClick={() => onClick(params.row.id)} />
        </Box>
      ),
      hideable: false,
    })
  }
  return columns
}
