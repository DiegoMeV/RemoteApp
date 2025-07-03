import { usePrivileges, useQueryDynamicApi, useSearch } from '@/lib'
import { ViewSendAlerts } from './views'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { EditOption } from '../components'
import { containerEditOptionAlertTable } from '../components/styles'

const SendAlerts = () => {
  const searchSentAlerts = useSearch()
  const navigate = useNavigate()
  const hasPrivilege = usePrivileges('cgr.alertas.editar_envio_alertas')
  const addNewModel = () => {
    navigate('/applications/sendAlerts/new')
  }
  const onEditClick = (id) => {
    navigate(`/applications/sendAlerts/${id}`)
  }
  const {
    data: sendAlerts,
    error: errorInfoSendAlerts,
    isLoading: loadingSendAlerts,
  } = useQueryDynamicApi({
    url: '/envios',
    baseKey: 'urlCgr',
    isCompanyRequest: true,
  })
  const columns = [
    { field: 'identificador', headerName: 'Identificador', width: 200 },
    { field: 'sigedoc_salida', headerName: 'SigeDoc de salida', width: 200 },
    {
      field: 'dependencia',
      headerName: 'Dependencia destino',
      width: 200,
      valueGetter: (params) => `${params.row.dataDependencia.name ?? ''}`,
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
          <EditOption onClick={() => onEditClick(params.row.id)} />
        </Box>
      ),
      hideable: false,
    })
  }
  const params = {
    searchSentAlerts,
    addNewModel,
    sendAlerts,
    columns,
    errorInfoSendAlerts,
    loadingSendAlerts,
  }
  return <ViewSendAlerts {...params} />
}

export default SendAlerts
