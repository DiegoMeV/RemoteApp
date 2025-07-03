import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, LinearProgress } from '@mui/material'
import toast from 'react-hot-toast'
import { BackdropLoading, ErrorPage, GenericForm, useGetJobtitle, useSubmitJobtitle } from '@/libV4'

const JobtitleEdition = ({ idJobtitle, onSuccessFunction }) => {
  const formJobtitle = useForm()

  const {
    data: jobtitle,
    isLoading: loadingJobtitle,
    isError: errorJobtitle,
  } = useGetJobtitle({
    qry: `/${idJobtitle}`,
    enabled: !!idJobtitle,
  })

  const { mutateAsync: changeJobtitle, isPending: changingJobtitle } = useSubmitJobtitle({
    onSuccess: () => {
      toast.success('Cargo guardado con éxito')
      onSuccessFunction?.()
    },
    onError: (e) => {
      toast.error(e.response?.data?.message ?? 'Error al guardar el cargo')
    },
  })

  useEffect(() => {
    if (jobtitle) {
      const jobtitleData = jobtitle?.data
      formJobtitle.setValue('name', jobtitleData.name)
      formJobtitle.setValue('isActive', jobtitleData.isActive)
    }
  }, [formJobtitle, idJobtitle, jobtitle])

  const inputs = [
    {
      label: 'Nombre',
      name: 'name',
      type: 'text',
      className: 'col-span-12',
    },
    {
      label: 'Estado',
      name: 'isActive',
      type: 'switch',
      defaultValue: true,
      className: 'col-span-12',
    },
  ]

  const onSubmit = (data) => {
    if (!idJobtitle) {
      changeJobtitle({
        body: data,
      })
      return
    }
    changeJobtitle({
      body: data,
      bodyQry: `/${idJobtitle}`,
      bodyMethod: 'PUT',
    })
  }

  return (
    <form
      className='general_form_container'
      onSubmit={formJobtitle.handleSubmit(onSubmit)}
    >
      {loadingJobtitle ? (
        <LinearProgress className='col-span-12' />
      ) : errorJobtitle ? (
        <ErrorPage />
      ) : (
        <>
          <BackdropLoading loading={changingJobtitle} />
          <GenericForm
            inputs={inputs}
            control={formJobtitle.control}
          />
          <div className='col-span-12 flex justify-end gap-2'>
            <Button
              variant='contained'
              color='error'
            >
              Cancelar
            </Button>
            <Button
              variant='contained'
              type='submit'
            >
              Guardar
            </Button>
          </div>
        </>
      )}
    </form>
  )
}

export default JobtitleEdition
