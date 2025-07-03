import { ClassicIconButton } from '@/lib'
import { Add } from '@mui/icons-material'
import { Box } from '@mui/material'
import React from 'react'

const TableButtons = ({ handleCreate }) => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      width='100%'
    >
      <>
        {/* <ClassicIconButton
          title='Editar'
          placement='bottom'
          color='secondary'
          onClick={() => handleEdit(params.row.id)}
        >
          <Edit />
        </ClassicIconButton> */}
        <ClassicIconButton
          title='Crear'
          placement='bottom'
          color='secondary'
          onClick={handleCreate}
        >
          <Add />
        </ClassicIconButton>
      </>
    </Box>
  )
}

export default TableButtons
