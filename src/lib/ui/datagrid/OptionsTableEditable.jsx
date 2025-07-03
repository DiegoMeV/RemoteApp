import { Box } from '@mui/material'
import { ClassicIconButton } from '../buttons'
import { Cancel, Edit, Save, GroupOutlined, ViewHeadline } from '@mui/icons-material'
import { GridRowModes } from '@mui/x-data-grid-premium'
import { useLocation } from 'react-router-dom'
const OptionsTableEditable = ({
  rowModesModel,
  setRowModesModel,
  rowParams,
  setRows,
  assignOption,
  privilege,
  rolesAccess,
  setNewRow,
  handleClickShowModalUsers,
  newRow,
  setIdJobTitle,
  showRoles,
}) => {
  const { pathname } = useLocation()
  const handleInfoRow = () => {
    setIdJobTitle(rowParams?.jobTitle?.id)
  }
  const isInEditMode = rowModesModel?.[rowParams.id]?.mode === GridRowModes.Edit

  const iRolesPath = pathname.includes('/roles')

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
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
        <Box
          display='grid'
          gridTemplateColumns='1fr 1fr 1fr'
          width='100%'
        >
          {privilege && (
            <ClassicIconButton
              color='secondary'
              onClick={handleEditClick(rowParams?.id)}
              title='Editar'
              disabled={newRow ?? false}
            >
              <Edit />
            </ClassicIconButton>
          )}
          {rolesAccess && (
            <ClassicIconButton
              color='secondary'
              onClick={() => {
                showRoles?.handleShow(), handleInfoRow()
              }}
              title='Ver roles'
              disabled={newRow ?? false}
            >
              <ViewHeadline />
            </ClassicIconButton>
          )}
          {iRolesPath && (
            <ClassicIconButton
              color='secondary'
              onClick={() => {
                handleClickShowModalUsers(rowParams)
              }}
              title='Ver usuarios'
            >
              <GroupOutlined />
            </ClassicIconButton>
          )}

          {assignOption && assignOption?.privilege && (
            <ClassicIconButton
              color='secondary'
              onClick={() => {
                assignOption?.onClick(rowParams)
              }}
              title={assignOption?.title}
            >
              {assignOption?.icon}
            </ClassicIconButton>
          )}
        </Box>
      )}
    </Box>
  )
}

export default OptionsTableEditable
