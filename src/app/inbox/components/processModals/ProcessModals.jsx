import { BasicDataInbox, CustomModal } from '@/lib'
import { HistoricalTaskList } from '../historical'
import { AlertsInbox } from '../alertsInbox'
import { CurrentDocumentsInbox } from '../currentDocuments'
import { ChangeStatus } from '../changeStatus'
import { EditActivity } from '../editActivity'
import { DeleteNotification } from '../deleteNotification'
import { MWProcessModals } from '../../funcs'

const ProcessModals = ({
  idProcess,
  idActivity,
  modalOpen,
  handleOpenModal,
  handleCloseModal,
  identifier,
}) => {
  const modalOptions = [
    {
      title: `Histórico - ${identifier ?? ''}`,
      open: modalOpen === MWProcessModals.HISTORICAL,
      handleClose: handleCloseModal,
      children: (
        <HistoricalTaskList
          idProcess={idProcess}
          closeModal={handleCloseModal}
        />
      ),
    },
    {
      title: `Datos básicos`,
      open: modalOpen === MWProcessModals.BASIC_DATA,
      handleClose: handleCloseModal,
      children: <BasicDataInbox idProcess={idProcess} />,
    },
    {
      title: `Alertas - ${identifier ?? ''}`,
      open: modalOpen === MWProcessModals.ALERTS,
      handleClose: handleCloseModal,
      children: <AlertsInbox idProcess={idProcess} />,
    },
    {
      title: `Documentos Vigentes - ${identifier ?? ''}`,
      open: modalOpen === MWProcessModals.CURRENT_DOCS,
      handleClose: handleCloseModal,
      children: <CurrentDocumentsInbox idProcess={idProcess} />,
    },
    {
      title: `Cambiar estado del proceso ${identifier ?? ''}`,
      open: modalOpen === MWProcessModals.CHANGE_STATUS,
      handleClose: handleCloseModal,
      children: (
        <ChangeStatus
          idProcess={idProcess}
          closeModal={() => handleOpenModal(MWProcessModals.CHANGE_STATUS)}
        />
      ),
      height: 'auto',
    },
    {
      title: `Editar actividad - ${identifier ?? ''}`,
      open: modalOpen === MWProcessModals.EDIT_ACTIVITY,
      handleClose: handleCloseModal,
      size: 'md',
      height: 'auto',
      children: (
        <EditActivity
          idProcess={idProcess}
          idActivity={idActivity}
          handleClose={() => handleOpenModal(MWProcessModals.EDIT_ACTIVITY)}
        />
      ),
    },
    {
      title: `Eliminar notificación - ${identifier ?? ''}`,
      open: modalOpen === MWProcessModals.DELETE_NOTIFICATION,
      handleClose: handleCloseModal,
      size: 'md',
      height: 'auto',
      minHeight: 0,
      children: (
        <DeleteNotification
          idProcess={idProcess}
          idActivity={idActivity}
          handleClose={handleCloseModal}
        />
      ),
    },
  ]

  const modalOpened = modalOptions.find((modal) => modal.open)

  if (!modalOpened) return null

  return (
    <CustomModal
      open={modalOpened?.open ?? false}
      handleClose={modalOpened?.handleClose}
      size={modalOpened?.size ?? 'xxl'}
      height={modalOpened?.height ?? 'calc(100vh - 150px)'}
      title={modalOpened?.title}
      minHeight={modalOpened?.minHeight}
    >
      {modalOpened?.children}
    </CustomModal>
  )
}

export default ProcessModals
