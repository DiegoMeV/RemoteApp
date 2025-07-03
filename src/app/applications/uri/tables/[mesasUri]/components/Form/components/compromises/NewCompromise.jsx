import { useForm } from 'react-hook-form'
import { BackdropLoading, GenericForm } from '@/lib'
import CompromiseContainer from './CompromiseContainer'
import { CompromisesOptions } from '.'
import { useRequestCompromise } from './hooks'
import { compromiseInputs, editFuncCompromises } from './funcs'
import { Grid } from '@mui/material'

const NewCompromise = ({ compromise, handleDelete, refechCompromises, idTable, isTotallyApp }) => {
  const idCompromise = compromise?.id
  const { control, getValues, trigger } = useForm({
    defaultValues: {
      descripcion: compromise?.descripcion ?? '',
      fecha_inicial_cumplimiento: compromise?.fecha_inicial_cumplimiento ?? '',
      fecha_real_cumplimiento: compromise?.fecha_real_cumplimiento ?? '',
      responsable_cumplimiento: compromise?.responsable_cumplimiento ?? '',
    },
  })
  const { createCompromise, editCompromise, loadingUpdate } = useRequestCompromise(
    idTable,
    idCompromise,
    refechCompromises
  )
  const onSubmit = async () => {
    const validate = await trigger()
    if (validate) {
      const data = getValues()
      await editFuncCompromises(data, editCompromise, createCompromise, compromise)
    }
  }
  const compromiseForm = compromiseInputs({ isTotallyApp })
  return (
    <CompromiseContainer>
      <BackdropLoading loading={loadingUpdate} />
      <Grid
        container
        spacing={2}
        p={2}
        display='flex'
        justifyContent='flex-end'
      >
        <GenericForm
          inputs={compromiseForm}
          control={control}
        />
        <CompromisesOptions
          compromise={compromise}
          handleDelete={handleDelete}
          onSubmit={onSubmit}
        />
      </Grid>
    </CompromiseContainer>
  )
}

export default NewCompromise
