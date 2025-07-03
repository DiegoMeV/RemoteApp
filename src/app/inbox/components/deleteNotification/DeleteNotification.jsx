import { ViewDeleteNotification } from './views'

const DeleteNotification = ({ idProcess, idActivity, handleClose }) => {
  return (
    <ViewDeleteNotification
      idProcess={idProcess}
      idActivity={idActivity}
      handleClose={handleClose}
    />
  )
}

export default DeleteNotification
