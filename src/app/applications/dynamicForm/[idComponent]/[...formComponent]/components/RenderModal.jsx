import { CustomModal } from '@/lib'
import { AccordionDynamic } from '.'

const RenderModal = ({ block, modalOpen, idApplications, restProps, typeModule }) => {
  return (
    <CustomModal
      open={modalOpen?.[block.blockId]}
      handleClose={() => restProps.handleCloseModal(block.blockId)}
      title={'Bloque en Modal'}
      height='calc(100vh - 200px)'
      size='lg'
    >
      <AccordionDynamic
        block={block}
        typeModule={typeModule}
        idApplications={idApplications}
        {...restProps}
      />
    </CustomModal>
  )
}

export default RenderModal
