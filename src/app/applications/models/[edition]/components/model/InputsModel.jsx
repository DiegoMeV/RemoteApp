import { ChooseInput } from '@/lib'
import { Grid } from '@mui/material'

const InputsModel = ({ control }) => {
  const fields = [
    { name: 'nombre', label: 'Nombre', type: 'text', space: 5, required: true },
    { name: 'identificador', label: 'Identificador', type: 'text', space: 5, required: true },
    { name: 'activo', label: 'Estado', type: 'switch', space: 2, required: true },
    { name: 'descripcion', label: 'Descripción', type: 'multiline', space: 12 },
  ]
  return (
    <Grid
      container
      spacing={2}
      py={2}
    >
      {fields.map((field, index) => {
        return (
          <ChooseInput
            key={index}
            item={field}
            control={control}
          />
        )
      })}
    </Grid>
  )
}

export default InputsModel
