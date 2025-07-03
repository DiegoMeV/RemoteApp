import { CustomModal, LovMultiselect, MagicString } from '@/lib'
import { Box } from '@mui/material'
import { TableSigners } from '../../DocumentGeneration/Inputs'

const ModalSigners = ({ modalSigner, onSubmit, form, signersProps }) => {
  return (
    <CustomModal
      open={modalSigner.show}
      handleClose={modalSigner.handleShow}
      height={'auto'}
      title={'Seleccionar firmantes'}
      modalType={'form'}
      onSubmit={form.handleSubmit(onSubmit)}
      actions={[
        {
          label: MagicString.GENERAL.CANCEL_TITLE,
          color: 'error',
          onClick: modalSigner?.handleShow,
        },
        {
          label: MagicString.GENERAL.SAVE_TITLE,
          type: 'submit',
        },
      ]}
    >
      <Box
        display='flex'
        flexDirection='column'
        gap={2}
      >
        <LovMultiselect {...signersProps} />
        <TableSigners
          signersRows={form.watch('signers')}
          height={'100%'}
        />
      </Box>
    </CustomModal>
  )
}

export default ModalSigners
