import { ClassicIconButton, GenericForm } from '@/lib'
import { Delete } from '@mui/icons-material'
import { Grid } from '@mui/material'
import { inputsInfoTemplate } from '../../funcs'
import { useEffect } from 'react'

const VarsInfoTemplate = ({ data, index, form, handleDelete }) => {
  const INPUTS_VARS = inputsInfoTemplate({ data, index }) ?? []

  useEffect(() => {
    const valuePosition = `variables.${index}.orden`
    const currentPosition = form?.getValues(valuePosition)
    if (!currentPosition) {
      form?.setValue(valuePosition, index + 1)
    }
  }, [])

  return (
    <>
      <GenericForm
        inputs={INPUTS_VARS}
        control={form?.control}
      />
      <Grid
        item
        xs={12}
        md={0.5}
        display={'flex'}
        justifyContent='flex-end'
        alignItems={'center'}
      >
        <ClassicIconButton
          onClick={() => handleDelete({ position: index })}
          title={'Eliminar variable'}
          placement={'right'}
          color={'secondary'}
          hoverColor={'red'}
        >
          <Delete />
        </ClassicIconButton>
      </Grid>
    </>
  )
}

export default VarsInfoTemplate
