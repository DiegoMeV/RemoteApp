import { useState } from 'react'
import ViewSentAlerts from './ViewSentAlerts'
import { useQueryDynamicApi } from '@/lib'

const SentAlerts = ({ idEdition }) => {
  const [uploadFileAccState, setUploadFileAccState] = useState(false)
  const handleOpenUploadFileAcc = () => {
    setUploadFileAccState(!uploadFileAccState)
  }
  const { data: alertsSent, isFetching: loadingAlertSent } = useQueryDynamicApi({
    url: `/alertasEnvio?idAlerta=${idEdition}`,
    baseKey: 'urlCgr',
    isCompanyRequest: true,
    enabled: idEdition !== undefined,
  })
  const columns = [
    {
      field: 'nro_envio',
      headerName: 'Número de Envío',
      width: 150,
      valueGetter: (params) => `${params.row.dataEnvio.identificador}`,
    },
    {
      field: 'fecha_envio',
      headerName: 'Fecha de Envío',
      width: 150,
      valueGetter: (params) => `${params.row.dataEnvio.fecha_audita}`,
    },
    {
      field: 'dep_destino',
      headerName: 'Dependencia destino',
      width: 150,
      valueGetter: (params) => `${params.row.dataEnvio.dataDependencia.name}`,
    },
    {
      field: 'usuario',
      headerName: 'Usuario',
      width: 150,
      valueGetter: (params) =>
        `${`${params.row.dataUserAudita?.firstName ?? ''} ${
          params.row.dataUserAudita?.lastName ?? ''
        }`} `,
    },
  ]

  return (
    <ViewSentAlerts
      handleOpenUploadFileAcc={handleOpenUploadFileAcc}
      uploadFileAccState={uploadFileAccState}
      alertsSent={alertsSent}
      isLoading={loadingAlertSent}
      columns={columns}
    />
  )
}

export default SentAlerts
