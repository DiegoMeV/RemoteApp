import { Box } from '@mui/material'
import { useStageData } from '../hooks'
import { sxSidebarConstructorStyles } from '../styles'
import { StageEditorForm } from '.'

const StageSidebarContainer = () => {
  const { isLoading, onSubmit, form } = useStageData()

  const { control, handleSubmit, watch } = form

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={sxSidebarConstructorStyles.formStageContainer}
    >
      <StageEditorForm
        isLoading={isLoading}
        control={control}
        watch={watch}
      />
    </Box>
  )
}

export default StageSidebarContainer
