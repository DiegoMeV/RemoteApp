import { Box, Button } from '@mui/material'
import { useFieldArray } from 'react-hook-form'
import { ItemColumn } from '.'

const handleAppend = (append) => {
  const idItem = crypto.randomUUID()
  const newOption = { id: idItem, title: '', source: '' }
  append(newOption)
}

const ContentArrColumns = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'groupSpecs.inboxProps.columns',
  })

  return (
    <Box
      component='article'
      sx={{
        maxHeight: '500px',
        overflow: 'auto',
        p: '20px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          variant='contained'
          onClick={() => handleAppend(append)}
        >
          Agregar columna
        </Button>
      </Box>
      {fields?.map((item, index) => {
        return (
          <ItemColumn
            key={item.id}
            index={index}
            item={item}
            remove={remove}
            control={control}
          />
        )
      })}
    </Box>
  )
}

export default ContentArrColumns
