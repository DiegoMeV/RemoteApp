import { Box } from '@mui/material'
import { Cancel, Edit, Save } from '@mui/icons-material'
import { GridRowModes } from '@mui/x-data-grid-premium'
import { ClassicIconButton } from '@/lib'
const OptionsTableMember = ({
  rowModesModel,
  setRowModesModel,
  rowParams,
  setRows,
  setNewRow,
  setIdMember,
  editAccess,
}) => {
  const isInEditMode = rowModesModel?.[rowParams.id]?.mode === GridRowModes.Edit

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
    setIdMember(id)
  }
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }
  const handleCancelClick = (id) => () => {
    if (rowParams.isNew) {
      setRows((prev) => prev.filter((row) => row.id !== id))
      setNewRow(false)
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      })
    } else {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      })
    }
  }
  return (
    <Box
      display='flex'
      justifyContent='center'
      width='100%'
    >
      {isInEditMode ? (
        <>
          <ClassicIconButton
            color='secondary'
            onClick={handleSaveClick(rowParams?.id)}
            title='Guardar'
          >
            <Save />
          </ClassicIconButton>
          <ClassicIconButton
            color='secondary'
            hoverColor='red'
            onClick={handleCancelClick(rowParams?.id)}
            title='Cancelar'
          >
            <Cancel />
          </ClassicIconButton>
        </>
      ) : (
        editAccess && (
          <Box
            display='grid'
            gridTemplateColumns='1fr 1fr 1fr'
            width='100%'
          >
            <ClassicIconButton
              color='secondary'
              onClick={handleEditClick(rowParams?.id)}
              title='Editar'
            >
              <Edit />
            </ClassicIconButton>
          </Box>
        )
      )}
    </Box>
  )
}

export default OptionsTableMember
