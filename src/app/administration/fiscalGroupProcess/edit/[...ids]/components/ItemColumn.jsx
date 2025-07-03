import { ClassicIconButton, CustomTextField } from '@/lib'
import { Delete } from '@mui/icons-material'
import { Grid } from '@mui/material'
import toast from 'react-hot-toast'

const ItemColumn = ({ remove, fieldsLength, control, index, validationOneItem = true }) => {
  const handleRemove = (position) => {
    if (validationOneItem || fieldsLength !== 1) {
      remove(position)
      return
    }

    toast.error('No se pudo eliminar, ya que al menos la lista de valores debe tener un elemento')
  }

  const textInputType = (name, label, readOnly) => {
    return {
      name: name,
      label: label,
      required: true,
      readOnly,
      sx: { width: '100%', minWidth: '100px' },
    }
  }

  const labelItem = textInputType(
    `groupSpecs.inboxProps.columns.${index}.title`,
    'Titulo de la columna',
    false
  )
  const valueItem = textInputType(
    `groupSpecs.inboxProps.columns.${index}.source`,
    'Dato de la columna',
    false
  )

  return (
    <Grid
      container
      spacing={2}
      sx={{
        pt: '20px',
        pb: '10px',
      }}
    >
      <Grid
        item
        xs={5.5}
      >
        <CustomTextField
          item={labelItem}
          control={control}
        />
      </Grid>
      <Grid
        item
        xs={5.5}
      >
        <CustomTextField
          item={valueItem}
          control={control}
        />
      </Grid>
      <Grid
        item
        xs={1}
      >
        <ClassicIconButton
          onClick={() => handleRemove(index)}
          title={'Eliminar'}
          placement={'bottom'}
        >
          <Delete />
        </ClassicIconButton>
      </Grid>
    </Grid>
  )
}

export default ItemColumn
