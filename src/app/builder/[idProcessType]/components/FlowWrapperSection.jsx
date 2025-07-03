import { Box } from '@mui/material'
import { useFlowStruct } from '../hooks'
import { FlowWrapperEditor } from '.'
import { ErrorPage, Loading } from '@/lib'

const FlowWrapperSection = ({ infoTypeProcess, isSuccess }) => {
  const idGroup = infoTypeProcess?.data?.[0]?.idGroup

  const { loadingStages, errorInStage, showCloseBtn } = useFlowStruct({
    infoTypeProcess,
    isSuccess,
  })

  return (
    <Box
      height='100%'
      component='section'
    >
      {loadingStages ? (
        <Loading />
      ) : errorInStage ? (
        <ErrorPage />
      ) : (
        <FlowWrapperEditor
          showCloseBtn={showCloseBtn}
          idGroup={idGroup}
        />
      )}
    </Box>
  )
}

export default FlowWrapperSection
