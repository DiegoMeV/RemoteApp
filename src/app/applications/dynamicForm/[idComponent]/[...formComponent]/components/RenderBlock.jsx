import { CustomAccordion } from '@/lib'
import { useState } from 'react'
import { Form, NewDataGridDynamic } from '../views'

const RenderBlock = ({ block, firstBlock, ...props }) => {
  const [isOPenBlock, setIsOPenBlock] = useState((block?.isDefaultOpen || firstBlock) ?? false)
  const openBlock = () => {
    setIsOPenBlock(!isOPenBlock)
  }
  return (
    <CustomAccordion
      defaultExpanded={isOPenBlock}
      onClickAccordion={openBlock}
      title={block?.title}
    >
      {isOPenBlock && (
        <>
          {block?.type === 'FORM' ? (
            <Form
              block={block}
              {...props}
            />
          ) : (
            <NewDataGridDynamic
              block={block}
              {...props}
            />
          )}
        </>
      )}
    </CustomAccordion>
  )
}

export default RenderBlock
