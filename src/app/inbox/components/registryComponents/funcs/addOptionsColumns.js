import { Delete, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export const addOptionsColumns = ({ columns, handleAddRow, formModal, handleDelete }) => {
  const setFormValues = (row) => {
    Object.keys(row).forEach((key) => {
      formModal.setValue(key, row[key])
    })
    formModal.setValue('isEdit', true)
  }
  const columnsOptions = [
    ...columns,
    {
      field: 'options',
      headerName: '',
      sortable: false,
      resizable: false,
      disableColumnMenu: true,
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            <IconButton
              onClick={() => {
                setFormValues(params.row)
                handleAddRow()
              }}
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => {
                handleDelete(params.row.id)
              }}
            >
              <Delete />
            </IconButton>
          </div>
        )
      },
    },
  ]
  return columnsOptions
}
