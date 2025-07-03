import { EditOption } from '@/app/applications/components'
import { containerEditOptionAlertTable } from '@/app/applications/components/styles'
import { formatToLocaleDateString } from '@/lib'
import { Box } from '@mui/material'

const columnsOperations = (handleClose, hasPrivilege) => {
  const openModal = (row) => {
    handleClose(row)
  }
  const columns = [
    {
      field: 'actingType',
      headerName: 'Tipo de Actuacion',
      minWidth: 200,
      valueGetter: (params) => {
        return `${params?.row?.dataTipoActuacion?.nombre ?? ''}`
      },
    },
    {
      field: 'dependency',
      headerName: 'Dependencia',
      minWidth: 200,
      valueGetter: (params) => {
        return `${params?.row?.dataDependencia?.name ?? ''}`
      },
    },
    {
      field: 'user',
      headerName: 'Usuario',
      minWidth: 200,
      valueGetter: (params) => {
        return `${params?.row?.dataUserAudita?.firstName ?? ''} ${
          params?.row?.dataUserAudita?.lastName ?? ''
        }`
      },
    },
    {
      field: 'initialDate',
      headerName: 'Fecha inicial',
      minWidth: 120,
      valueGetter: (params) => {
        return `${formatToLocaleDateString(params?.row?.fecha_inicio)}`
      },
    },
    {
      field: 'finalDate',
      headerName: 'Fecha final',
      minWidth: 120,
      valueGetter: (params) => {
        return `${formatToLocaleDateString(params?.row?.fecha_final)}`
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
              openModal(params.row)
            }}
          />
        </Box>
      ),
      hideable: false,
    })
  }
  return { columns }
}

export default columnsOperations
