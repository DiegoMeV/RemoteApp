import { ClassicIconButton } from '@/lib'
import { Cancel, Delete, Edit, Save } from '@mui/icons-material'
import { Box } from '@mui/material'
import { GridRowModes } from '@mui/x-data-grid-premium'

const TableOptions = ({
  params,
  rowModesModel,
  editable,
  handleCancelClick,
  handleEditClick,
  handleSaveClick,
  handleDeleteClick,
  shouldDelete,
}) => {
  const editMode = rowModesModel?.[params.id]?.mode === GridRowModes.Edit
  return (
    <Box mx='auto'>
      {editMode ? (
        <>
          <ClassicIconButton
            color='secondary'
            onClick={() => handleSaveClick(params?.id)}
          >
            <Save />
          </ClassicIconButton>
          <ClassicIconButton
            color='secondary'
            onClick={() => handleCancelClick(params?.id)}
          >
            <Cancel />
          </ClassicIconButton>
        </>
      ) : (
        <>
          {editable && (
            <ClassicIconButton
              color='secondary'
              onClick={() => handleEditClick(params?.id)}
            >
              <Edit />
            </ClassicIconButton>
          )}
          {shouldDelete && (
            <ClassicIconButton
              color='secondary'
              onClick={() => handleDeleteClick(params?.id)}
            >
              <Delete />
            </ClassicIconButton>
          )}
        </>
      )}
    </Box>
  )
}

export default TableOptions
