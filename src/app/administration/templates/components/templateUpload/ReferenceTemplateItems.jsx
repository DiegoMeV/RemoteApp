import { ClassicIconButton } from '@/lib'
import { Delete } from '@mui/icons-material'
import { Grid } from '@mui/material'
import { inputsReferenceTemplates } from '../../funcs'
import { GenericForm } from '@/libV4'

const ReferenceTemplateItems = ({ index, data, form, handleDelete }) => {
  const INPUTS_TEMPLATES = inputsReferenceTemplates({ data, index }) ?? []

  return (
    <>
      <Grid
        item
        xs={12}
        md={11}
      >
        <div className='general_form_container py-2 px-4'>
          <GenericForm
            inputs={INPUTS_TEMPLATES}
            control={form?.control}
          />
        </div>
      </Grid>
      <Grid
        item
        xs={12}
        md={1}
        display={'flex'}
        justifyContent='flex-end'
        alignItems={'center'}
      >
        <ClassicIconButton
          onClick={() => handleDelete({ position: index })}
          title={'Eliminar plantilla relacionada'}
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

export default ReferenceTemplateItems
