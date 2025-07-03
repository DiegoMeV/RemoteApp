import { DynamicTableAlert } from '@/app/applications/components'
import { CustomAccordion, CustomModal, CustomSearchDatagrid, ErrorPage } from '@/lib'
import { BasicDataModal } from './components'

const ViewAlertManagementProcesses = ({
  columns,
  processesInAlert,
  loadingProcessesInAlert,
  processesInAlertAccState,
  handleOpenProcessesInAlertAcc,
  errorProcessesInAlert,
  modalInfoAlert,
  infoRowSelected,
}) => {
  return (
    <CustomAccordion
      title='Procesos de gestión de alerta'
      expandedValue={processesInAlertAccState}
      onClickAccordion={handleOpenProcessesInAlertAcc}
    >
      {errorProcessesInAlert ? (
        <ErrorPage />
      ) : (
        <DynamicTableAlert
          columns={columns}
          rows={processesInAlert?.data ?? []}
          loading={loadingProcessesInAlert}
          toolbar={CustomSearchDatagrid}
        />
      )}
      {modalInfoAlert?.show && (
        <CustomModal
          open={modalInfoAlert?.show}
          handleClose={modalInfoAlert?.handleShow}
          title={'Datos de la actuación'}
          size='lg'
        >
          <BasicDataModal infoRowSelected={infoRowSelected} />
        </CustomModal>
      )}
    </CustomAccordion>
  )
}

export default ViewAlertManagementProcesses
