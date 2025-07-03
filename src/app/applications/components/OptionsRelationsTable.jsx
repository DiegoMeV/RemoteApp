import { ClassicIconButton } from '@/lib'
import { Cancel, Edit, Save } from '@mui/icons-material'
import { Box } from '@mui/material'
import { GridRowModes } from '@mui/x-data-grid-premium'

const OptionsRelationsTable = ({
  id,
  rowModesModel,
  setRowModesModel,
  setRows,
  setNewRow,
  newRow,
}) => {
  const isEditMode = rowModesModel[id]?.mode === 'edit'
  const handleSaveClick = (id) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }
  const handleCancelClick = (id) => {
    if (!newRow) {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      })
    } else {
      setRows((prev) => prev.filter((row) => row.id !== id))
      setNewRow(false)
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      })
    }
  }
  const handleEditClick = (id) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  return (
    <Box
      display='flex'
      width='100%'
      justifyContent='center'
    >
      {isEditMode ? (
        <>
          <ClassicIconButton
            color='secondary'
            onClick={() => {
              handleSaveClick(id)
            }}
          >
            <Save />
          </ClassicIconButton>
          <ClassicIconButton
            color='secondary'
            onClick={() => {
              handleCancelClick(id)
            }}
          >
            <Cancel />
          </ClassicIconButton>
        </>
      ) : (
        <>
          <ClassicIconButton
            onClick={() => {
              handleEditClick(id)
            }}
            color='secondary'
          >
            <Edit />
          </ClassicIconButton>
        </>
      )}
    </Box>
  )
}

export default OptionsRelationsTable
