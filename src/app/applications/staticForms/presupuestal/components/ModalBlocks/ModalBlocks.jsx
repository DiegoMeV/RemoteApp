import { CustomModal } from '@/libV4'

const ModalBlocks = ({ open, handleClose }) => {
  return (
    <CustomModal
      title='Movimiento presupuestal'
      open={open}
      handleClose={handleClose}
    >
      <div className='flex flex-col gap-4 p-4'>
        <h2 className='text-lg font-semibold'>Modal Blocks</h2>
        <p>This is a placeholder for modal content.</p>
        {/* Add your modal content here */}
      </div>
    </CustomModal>
  )
}

export default ModalBlocks
