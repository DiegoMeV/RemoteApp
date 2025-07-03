import { ViewAlertsToSent } from './view'
import {
  useBoolean,
  useSearch,
  useQueryDynamicApi,
  useMutationDynamicBaseUrl,
  useAlertasProceso,
} from '@/lib'
import toast from 'react-hot-toast'
import { TableOptions } from './components'

const AlertsToSent = ({ idEdition, idModelo }) => {
  // TODO: pagination to LOV
  // const [model, setModel] = useState({ page: 0, pageSize: 50 })
  const valueListAlerts = useBoolean()
  const {
    data: sentAlerts,
    refetch: refetchSentAlerts,
    isFetching: isLoadingSendAlerts,
  } = useQueryDynamicApi({
    url: `/alertasEnvio?idEnvio=${idEdition}&esBorrado=false`,
    baseKey: 'urlCgr',
    isCompanyRequest: true,
  })
  const searchAlert = useSearch()
  const { data: alerts, isLoading: loadingAlerts } = useAlertasProceso({
    qry: searchAlert.searchText
      ? `/ByEstadoUnique/APROBADA?aumentarInfo=true&qryAlerta=${searchAlert.searchText}&idModelo=${idModelo}`
      : `/ByEstadoUnique/APROBADA?aumentarInfo=true&idModelo=${idModelo}`,
    enabled: valueListAlerts.show,
  })

  const { mutateAsync: putAlertsInSents, isPending: isPendingAsing } = useMutationDynamicBaseUrl({
    url: '/alertasEnvio',
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    onSuccess: () => {
      refetchSentAlerts()
      toast.success('Se ha actualizado la alerta con éxito')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'ha ocurrido un error')
    },
  })
  const handleAlertSelection = ({ row }) => {
    putAlertsInSents({
      body: {
        id_envio: idEdition,
        id_alerta: row?.alerta_id,
      },
    })
  }
  const deleteAlertSent = (id) => {
    putAlertsInSents({ qry: `/${id}`, methodBody: 'PUT', body: { esBorrado: true } })
  }
  const toggleDisabled = (params) => {
    const isMatch = sentAlerts?.data?.find((alert) => {
      return alert?.id_alerta === params?.row?.alerta_id
    })
    return isMatch ? true : false
  }
  const columns = [
    {
      field: 'dataAlerta',
      headerName: 'Alerta',
      editable: true,
      width: 350,
      valueGetter: (params) => {
        return `${params?.row?.dataAlerta?.identificador ?? ''} ${
          params?.row?.dataAlerta?.modeloInfo?.nombre
        }`
      },
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      width: 300,
      editable: true,
      valueGetter: (params) => {
        return `${params?.row?.dataAlerta?.descripcion ?? params?.row?.alert?.descripcion ?? ''}`
      },
    },
    {
      field: 'options',
      headerName: '',
      width: 60,
      renderCell: (params) => {
        return (
          <TableOptions
            params={params}
            handleDeleteClick={deleteAlertSent}
          />
        )
      },
    },
  ]

  const columnsAlertsLov = [
    {
      field: 'identificador',
      headerName: 'Alerta',
      minWidth: 250,
      valueGetter: (params) => {
        return `${params?.row?.alertaInfo?.identificador}`
      },
    },
    {
      field: 'modelName',
      headerName: 'Modelo',
      minWidth: 300,
      valueGetter: (params) => {
        return `${params?.row?.alertaInfo?.modeloInfo?.nombre ?? ''}`
      },
    },
  ]
  const params = {
    columns,
    sentAlerts,
    isLoadingSendAlerts,
    valueListAlerts,
    searchAlert,
    alerts,
    loadingAlerts,
    columnsAlertsLov,
    handleAlertSelection,
    toggleDisabled,
    isPendingAsing,
  }
  return <ViewAlertsToSent {...params} />
}

export default AlertsToSent
