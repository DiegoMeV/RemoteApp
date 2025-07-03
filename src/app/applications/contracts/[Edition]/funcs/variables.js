import { ClassicIconButton, TextFieldEditingDG } from '@/lib'
import { Cancel, Edit, Save } from '@mui/icons-material'
import { Chip, Typography } from '@mui/material'
import { GridRowModes } from '@mui/x-data-grid-premium'

export const variablesColumns = (rowModesModel, setRowModesModel, setRowSelected) => {
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = (row) => () => {
    setRowModesModel({ ...rowModesModel, [row.id]: { mode: GridRowModes.View } })
    setRowSelected(row)
  }

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    })
  }

  return [
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 200,
      renderCell: (params) => {
        return <Typography variant='body2'>{params?.row?.variableInfo?.titulo ?? ''}</Typography>
      },
    },
    {
      field: 'valor',
      headerName: 'Valor',
      minWidth: 500,
      flex: 1,
      editable: true,
      renderEditCell: (params) => <TextFieldEditingDG {...params} />,
    },
    {
      field: 'requerido',
      headerName: '',
      flex: 200,
      renderCell: (params) =>
        params.value ? (
          <Chip
            color='error'
            variant='outlined'
            label='Requerido'
          />
        ) : (
          ''
        ),
    },
    {
      field: 'options',
      headerName: '',
      width: 90,
      renderCell: ({ row }) => {
        const isInEditMode = rowModesModel[row.id]?.mode === GridRowModes.Edit
        return (
          <>
            {!isInEditMode ? (
              <ClassicIconButton
                color='secondary'
                title='Editar'
                onClick={handleEditClick(row.id)}
              >
                <Edit />
              </ClassicIconButton>
            ) : (
              <>
                <ClassicIconButton
                  color='secondary'
                  title='Guardar'
                  onClick={handleSaveClick(row)}
                >
                  <Save />
                </ClassicIconButton>
                <ClassicIconButton
                  color='secondary'
                  title='Cancelar'
                  onClick={handleCancelClick(row.id)}
                >
                  <Cancel />
                </ClassicIconButton>
              </>
            )}
          </>
        )
      },
    },
  ]
}
