import { CustomModal } from '@/lib'
import { CriteriaCategory } from '.'

const ModalCriteria = ({ modalCriteria, idCategory }) => {
  return (
    <CustomModal
      open={modalCriteria.show}
      handleClose={modalCriteria.handleShow}
      title='Criterios'
      height='calc(100vh - 150px)'
      size='lg'
    >
      <CriteriaCategory idCategory={idCategory} />
    </CustomModal>
  )
}

export default ModalCriteria
