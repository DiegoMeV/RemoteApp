import { NoAccessCard } from '@/lib'
import { columnsTableRegistryAlerts } from '../funcs'
import { ViewAlertModified, ViewTableAlerts } from '.'
import { useState } from 'react'
import { AccessControl } from '@/libV4'

const ModalTableAlerts = ({ modalInfo, handleClose, handleSetAlertToProcess }) => {
  const [alertService, setAlertService] = useState({
    view: modalInfo.view,
    additionalData: modalInfo.additionalData,
  })

  const { columns } = columnsTableRegistryAlerts(setAlertService)

  return (
    <AccessControl
      privilege={'cgr.alertas.visualizar_alertas'}
      nodeContent={<NoAccessCard />}
    >
      {alertService?.view === 'table' && (
        <ViewTableAlerts
          columns={columns}
          setAlertService={setAlertService}
        />
      )}
      {(alertService?.view === 'new' || alertService?.view === 'edit') && (
        <ViewAlertModified
          alertService={alertService}
          setAlertService={setAlertService}
          handleBack={handleClose}
          hasBackPath={'currentPage'}
          handleSetAlertToProcess={handleSetAlertToProcess}
        />
      )}
    </AccessControl>
  )
}

export default ModalTableAlerts
