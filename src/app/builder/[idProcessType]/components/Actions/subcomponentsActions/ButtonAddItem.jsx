import { Add } from '@mui/icons-material'
import { Box, Button } from '@mui/material'

const handleAppend = (append) => {
  const idItem = crypto.randomUUID()
  const newOption = { id: idItem, label: '', value: '' }
  append(newOption)
}

const ButtonAddItem = ({ append, title = 'Agregar opcion' }) => {
  return (
    <Box
      width='100%'
      display={'flex'}
      justifyContent='flex-end'
      mb={1}
    >
      <Button
        variant='outlined'
        onClick={() => handleAppend(append)}
        startIcon={<Add />}
        size='small'
      >
        {title}
      </Button>
    </Box>
  )
}

export default ButtonAddItem
