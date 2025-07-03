import { ViewEditActivity } from './views'

const EditActivity = ({ idProcess, idActivity, handleClose }) => {
  return (
    <ViewEditActivity
      idProcess={idProcess}
      idActivity={idActivity}
      handleClose={handleClose}
    />
  )
}

export default EditActivity
