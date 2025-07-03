// CHANGE
import { ClassicIconButton, CustomTextField } from '@/lib'
import { Delete } from '@mui/icons-material'
import { Box, Divider } from '@mui/material'

const FormCreateLov = ({
  titleFirstInput = 'Nombre a mostrar',
  remove,
  control,
  index,
  arrayName = 'actionItemSpecs',
  titleSecondInput = 'Ingrese valor',
}) => {
  const textInputType = (name, label, readOnly) => {
    return {
      name: name,
      label: label,
      required: true,
      readOnly,
      sx: { width: '100%', minWidth: '100px' },
    }
  }

  const labelItem = textInputType(`${arrayName}.${index}.label`, titleFirstInput, false)
  const valueItem = textInputType(`${arrayName}.${index}.value`, titleSecondInput, false)

  const handleRemove = (position) => {
    remove(position)
  }

  return (
    <Box
      width='100%'
      mb='20px'
      height='auto'
    >
      <Box
        width='100%'
        gap='10px'
        display='flex'
        mb='10px'
      >
        <Box flex={1}>
          <CustomTextField
            item={labelItem}
            control={control}
          />
        </Box>
        <Box flex={1}>
          <CustomTextField
            item={valueItem}
            control={control}
          />
        </Box>
        <Box>
          <ClassicIconButton
            onClick={() => handleRemove(index)}
            title={'Eliminar'}
            placement={'bottom'}
          >
            <Delete />
          </ClassicIconButton>
        </Box>
      </Box>
      <Divider />
    </Box>
  )
}

export default FormCreateLov
