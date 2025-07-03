import { useForm } from 'react-hook-form'
import { Card, CardContent, Button } from '@mui/material'
import { BackdropLoading, GenericForm } from '@/lib'
import { useFunctionsUsers } from '../../hooks'

const dataForm = [
  { label: 'SIIFWEB Aliases', name: 'SIIFWEB', type: 'text', required: false },
  { label: 'Súper usuario', name: 'superSaiyayin', type: 'switch', required: false },
]

const SpecialOptions = ({ idUser, userInfo }) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      SIIFWEB: userInfo?.aliases?.SIIFWEB || '',
      superSaiyayin: userInfo?.superSaiyayin || false,
    },
  })

  const { updateUser, isPending } = useFunctionsUsers(idUser)

  const onSubmit = async (data) => {
    updateUser({ body: { aliases: { SIIFWEB: data.SIIFWEB }, superSaiyayin: data.superSaiyayin } })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-h-[calc(100vh-200px)] overflow-auto p-4'
    >
      <BackdropLoading loading={isPending} />
      <Card
        raised
        sx={{ width: '100%' }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', rowGap: 1 }}>
          <GenericForm
            inputs={dataForm}
            control={control}
          />

          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
          >
            Guardar cambios
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}

export default SpecialOptions
