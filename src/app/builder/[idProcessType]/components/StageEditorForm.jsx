import { Box, Button } from '@mui/material'
import { Save } from '@mui/icons-material'

import { useStoreState } from 'easy-peasy'

import { sxSidebarConstructorStyles } from '../styles'

import { SwitchInput } from '@/lib'
import { GenericForm } from '@/libV4'
import { stageItemInputs } from '../funcs'

const StageEditorForm = ({ isLoading, control, watch }) => {
  const variationParams = useStoreState((actions) => actions.reactFlowState.variationParams)

  const toggleDisabled = (id) => {
    const idOfficeExec = watch('data.idOfficeExec')
    return idOfficeExec === id || idOfficeExec?.id === id
  }

  const ITEMS_STAGE = stageItemInputs({
    isDisabled: isLoading,
    isFiscalService: variationParams?.byActionTypes === 'fiscal',
    toggleDisabled,
  })

  return (
    <>
      <Box sx={sxSidebarConstructorStyles.formStageContainerButton}>
        <SwitchInput
          item={{ name: 'data.isEnabled', disabled: isLoading }}
          control={control}
        />
        <Button
          startIcon={<Save />}
          variant='contained'
          size='small'
          type='submit'
          disabled={isLoading}
        >
          Guardar
        </Button>
      </Box>
      <div className='w-full general_form_container'>
        <GenericForm
          inputs={ITEMS_STAGE}
          control={control}
        />
      </div>
    </>
  )
}

export default StageEditorForm
