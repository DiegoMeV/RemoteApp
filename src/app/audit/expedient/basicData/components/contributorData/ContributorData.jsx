import { CardLayout, GenericForm } from '@/lib'
import { useForm } from 'react-hook-form'
import { inputsList } from './inputsList'
import { Grid } from '@mui/material'

const ContributorData = () => {
  const form = useForm()

  return (
    <CardLayout title='Datos del contribuyente'>
      <Grid
        container
        spacing={2}
      >
        <GenericForm
          control={form.control}
          inputs={inputsList}
        />
      </Grid>
    </CardLayout>
  )
}

export default ContributorData
