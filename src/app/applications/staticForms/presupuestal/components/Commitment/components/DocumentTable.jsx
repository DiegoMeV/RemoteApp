import { BasicTable } from '@/libV4'
import { DeleteOutline } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'

const DocumentTable = ({ rows, setSelectedCompromise, handleDeleteQuery }) => {
  const deleteCompromise = (row) => {
    if (!row.isNew) {
      handleDeleteQuery(row)
    }
    setSelectedCompromise((prev) => {
      const isSelected = prev.some((item) => item.nrodoc === row.nrodoc)
      return isSelected && prev.filter((item) => item.nrodoc !== row.nrodoc)
    })
  }
  const columns = [
    {
      field: 'nrodoc',
      headerName: 'Con cargo a compromiso',
      pinned: 'left',
    },
    {
      field: 'concepto',
      headerName: 'Concepto',
    },
    {
      field: 'options',
      headerName: '',
      pinned: 'right',
      width: 240,
      renderCell: (row) => (
        <>
          <Button variant='contained'>Copiar descripción</Button>
          <IconButton onClick={() => deleteCompromise(row)}>
            <DeleteOutline />
          </IconButton>
        </>
      ),
    },
  ]

  return (
    <div className='backgroundGray1 p-2 rounded-md'>
      <BasicTable
        rows={rows ?? []}
        columns={columns}
        containerProps={{
          className: 'h-[calc(100vh-300px)] backgroundwhite1',
        }}
      />
    </div>
  )
}

export default DocumentTable
