import { Box, Button } from '@mui/material'
import { columns } from '../funcs'
import { GenericTable, useBoolean } from '@/lib'
import AddCommentsToProcess from './AddCommentsToProcess'

const TableNotes = ({ process, loadingProcess, idProcess }) => {
  const modalToAddComments = useBoolean(null, {
    icon: 'warning',
    content: '¿Está seguro de cancelar?',
  })

  const proccesOrdered =
    process?.data?.toSorted?.((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)) ?? []

  return (
    <Box
      sx={{
        height: 'calc(100vh - 220px)',
        backgroundColor: 'backdroungGrey1',
      }}
    >
      <Box
        display='flex'
        justifyContent='flex-end'
        mb={2}
      >
        <Button
          variant='contained'
          size='medium'
          onClick={modalToAddComments.handleShow}
        >
          Agregar nota
        </Button>
      </Box>
      <GenericTable
        columns={columns ?? []}
        rows={proccesOrdered ?? []}
        loading={loadingProcess}
        sx={{ backgroundColor: 'backdroungWhite1' }}
      />

      {modalToAddComments?.show && (
        <AddCommentsToProcess
          modalToAddComments={modalToAddComments}
          idProcess={idProcess}
        />
      )}
    </Box>
  )
}

export default TableNotes
