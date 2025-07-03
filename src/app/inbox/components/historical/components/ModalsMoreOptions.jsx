import { CustomModal } from '@/lib'
import { DeleteNotification } from '../../deleteNotification'
import { EditActivity } from '../../editActivity'

const ModalsMoreOptions = ({ idProcess, idActivity, editActivity, deleteNotification }) => {
  const modalOptions = [
    {
      title: 'Editar actividad',
      open: editActivity.show,
      handleClose: editActivity.handleShow,
      size: 'md',
      height: 'auto',
      children: (
        <EditActivity
          idProcess={idProcess}
          idActivity={idActivity}
          handleClose={editActivity.handleShow}
        />
      ),
    },
    {
      title: 'Eliminar notificación',
      open: deleteNotification.show,
      handleClose: deleteNotification.handleShow,
      size: 'md',
      height: 'auto',
      minHeight: 0,
      children: (
        <DeleteNotification
          idProcess={idProcess}
          idActivity={idActivity}
          handleClose={deleteNotification.handleShow}
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

export default ModalsMoreOptions
