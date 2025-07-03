import { Button, Card, CardContent, Typography } from '@mui/material'
import { sxContentForm } from '../styles/stylesSx'
import { basicDataInputs } from '../const'
import { GenericForm } from '@/libV4'
import { useStoreState } from 'easy-peasy'

const AccountForm = ({ isLoadingEditUser, form }) => {
  const userData = useStoreState((state) => state.user.userData)
  const inputs = basicDataInputs(userData)

  return (
    <Card
      raised
      sx={{ width: '100%' }}
    >
      <CardContent sx={sxContentForm}>
        <Typography
          variant='h5'
          align='center'
        >
          Información del usuario
        </Typography>

        <div className='grid grid-cols-12 gap-4'>
          <GenericForm
            inputs={inputs}
            control={form.control}
          />
          <Button
            type='submit'
            disabled={isLoadingEditUser}
            variant='contained'
            color='primary'
            fullWidth
            className='col-span-12'
          >
            Guardar cambios
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AccountForm
