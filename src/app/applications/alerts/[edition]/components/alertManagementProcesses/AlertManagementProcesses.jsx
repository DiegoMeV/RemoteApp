import { useBoolean, useProcessAlerts } from '@/lib'
import ViewAlertManagementProcesses from './ViewAlertManagementProcesses'
import { useState } from 'react'
import { columnsAlertManagementProcesses } from './funcs'

const AlertManagementProcesses = ({ idAlerta }) => {
  const modalInfoAlert = useBoolean()
  const [processesInAlertAccState, setProcessesInAlertAccState] = useState(false)
  const [infoRowSelected, setInfoRowSelected] = useState({})
  const handleOpenProcessesInAlertAcc = () => {
    setProcessesInAlertAccState(!processesInAlertAccState)
  }
  const {
    data: processesInAlert,
    isFetching,
    isError,
  } = useProcessAlerts({
    qry: `?idAlerta=${idAlerta}&isSeguimiento=false`,
    enabled: processesInAlertAccState,
  })

  const columns = columnsAlertManagementProcesses({ modalInfoAlert, setInfoRowSelected })
  return (
    <ViewAlertManagementProcesses
      columns={columns}
      processesInAlert={processesInAlert}
      loadingProcessesInAlert={isFetching}
      errorProcessesInAlert={isError}
      processesInAlertAccState={processesInAlertAccState}
      handleOpenProcessesInAlertAcc={handleOpenProcessesInAlertAcc}
      modalInfoAlert={modalInfoAlert}
      infoRowSelected={infoRowSelected}
    />
  )
}

export default AlertManagementProcesses
