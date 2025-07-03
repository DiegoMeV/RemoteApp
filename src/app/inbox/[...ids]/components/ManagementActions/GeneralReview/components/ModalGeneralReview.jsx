import { CustomModal, GenericTextfield } from '@/lib'
import { titleOptions } from '../../constants'

const ModalGeneralReview = ({
  title,
  commentModal,
  reviewModal,
  handleReview,
  setCommnet,
  comment,
  handleChangeComment,
}) => {
  return (
    <CustomModal
      title={`Comentario de ${title ?? titleOptions?.[reviewModal] ?? ''}`}
      open={commentModal.show}
      handleClose={commentModal.handleShow}
      actions={[
        {
          label: 'Cancelar',
          color: 'error',
          onClick: () => {
            commentModal.handleShow()
            setCommnet('')
          },
        },
        {
          label: 'Guardar',
          onClick: handleReview,
        },
      ]}
    >
      <GenericTextfield
        label='Comentario *'
        value={comment}
        multiline={true}
        error={comment === ''}
        minRows={3}
        helperText={comment === '' ? 'Campo requerido' : ''}
        onChange={handleChangeComment}
      />
    </CustomModal>
  )
}

export default ModalGeneralReview
