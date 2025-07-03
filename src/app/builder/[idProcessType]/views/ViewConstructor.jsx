import { Divider } from '@mui/material'
import { memo } from 'react'
import { ContentConstructor, FlowWrapperSection, HeaderConstructor } from '../components'

const ViewConstructor = ({ infoTypeProcess, isSuccess }) => {
  return (
    <ContentConstructor>
      <HeaderConstructor infoTypeProcess={infoTypeProcess} />
      <Divider />
      <FlowWrapperSection
        infoTypeProcess={infoTypeProcess}
        isSuccess={isSuccess}
      />
    </ContentConstructor>
  )
}

export default memo(ViewConstructor)
