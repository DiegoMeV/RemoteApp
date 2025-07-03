import { Button, Box } from '@mui/material'
import { ContainerForms } from './ContainerForms'

const ViewForm = ({
  form,
  isPending,
  dataBlock,
  onSubmit,
  isFieldEnabled,
  isFormReady,
  pkValues,
  modeEditCreate,
  isEdit,
  blockId,
}) => {
  return (
    <Box
      container
      component='form'
    >
      <ContainerForms
        dataBlock={dataBlock}
        isPending={isPending}
        isFormReady={isFormReady}
        form={form}
        modeEditCreate={modeEditCreate}
        pkValues={pkValues}
        isEdit={isEdit}
        blockId={blockId}
        isFieldEnabled={isFieldEnabled}
      />

      <Box
        marginTop='16px'
        display='flex'
        justifyContent='flex-end'
      >
        <Box>
          <Button
            onClick={onSubmit}
            variant='contained'
            color='primary'
            disabled={isPending || !isFormReady || dataBlock?.isReadOnly}
            fullWidth
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ViewForm
