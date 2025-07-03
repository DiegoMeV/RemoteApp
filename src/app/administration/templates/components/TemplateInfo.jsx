import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { Check, Edit } from '@mui/icons-material'
import { ClassicIconButton } from '@/lib'
import toast from 'react-hot-toast'
import { useState } from 'react'

const TemplateInfo = ({ template, editTemplate }) => {
  const [editingName, setEditingName] = useState(false)
  const [textFieldValue, setTextFieldValue] = useState(template?.nombre || '')
  const handleNameTemplate = () => {
    if (textFieldValue === '') {
      toast.error('El nombre no puede estar vacío')
    } else {
      editTemplate({ body: { nombre: textFieldValue } })
      setEditingName(!editingName)
    }
  }

  return (
    <Box
      display='flex'
      alignItems='center'
    >
      {editingName ? (
        <TextField
          id='outlined-basic'
          label={'Nombre de la plantilla'}
          variant='outlined'
          onClick={(event) => event.stopPropagation()}
          size='small'
          value={textFieldValue}
          onChange={(event) => setTextFieldValue(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  color='success'
                  onClick={handleNameTemplate}
                >
                  <Check />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <Typography variant='h5'>
          {template ? template?.nombre : 'Error nombre plantilla'}
        </Typography>
      )}

      <ClassicIconButton
        title='Editar plantilla'
        color='secodnary'
        onClick={(event) => {
          event.stopPropagation()
          setEditingName(!editingName)
        }}
      >
        <Edit />
      </ClassicIconButton>
    </Box>
  )
}

export default TemplateInfo
