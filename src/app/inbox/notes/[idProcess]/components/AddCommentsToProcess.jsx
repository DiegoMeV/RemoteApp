import { CustomModal, GenericTextfield, MagicString, useMutateProcess } from '@/lib'
import { CircularProgress } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'

const AddCommentsToProcess = ({ modalToAddComments, idProcess }) => {
  const queryClient = useQueryClient()

  const { mutateAsync: createComment, isPending } = useMutateProcess({
    qry: `/${idProcess}/comments`,
    onSuccess: () => {
      queryClient.invalidateQueries([`/tablaRetencion`])
      modalToAddComments.handleShow()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
    },
  })

  const [comment, setComment] = useState('')

  const handleChangeComment = (e) => setComment(e.target.value)

  const handleSaveComment = async () => {
    if (!comment) {
      toast.error('El campo comentario es requerido')
      return
    }
    createComment({ body: { comment } })
  }

  return (
    <CustomModal
      open={modalToAddComments.show}
      handleClose={() => modalToAddComments.handleShowConfirm()}
      title='Agregar nota al proceso'
      size='lg'
      actions={[
        {
          label: 'Cancelar',
          color: 'error',
          onClick: () => modalToAddComments.handleShowConfirm(),
          disabled: isPending,
        },
        {
          label: isPending ? <CircularProgress size='20px' /> : 'Guardar',
          onClick: () => {
            handleSaveComment()
          },
          disabled: isPending,
          sx: { minWidth: '100px' },
        },
      ]}
    >
      <GenericTextfield
        value={comment}
        label='Comentario'
        multiline
        minRows={5}
        maxRows={20}
        onChange={handleChangeComment}
        disabled={isPending}
        required
      />
    </CustomModal>
  )
}

export default AddCommentsToProcess
